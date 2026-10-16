import * as THREE from "three";

// Personalises the stock avatar so it reads as Rahool: warm smile, dark-brown eyes,
// a swept-up pompadour, arched brows, smaller ears, light stubble and matching skin.
// All edits are applied once to the loaded model (bind-pose geometry + materials),
// so the existing rig, blink morphs and animations keep working.

export type LikenessOptions = {
  smile: number; // mouth-corner lift
  cheeks: number; // cheek lift that sells the smile
  eyeOpen: number; // fraction of the blink morphs subtracted to open the lids
  hairLift: number; // pompadour height (hair-local units)
  hairForward: number; // pompadour push towards the forehead
  hairline: number; // how far the fringe edge is raised
  browArch: number; // eyebrow arch height
  earScale: number; // 1 = original size
  stubble: number; // 0–1 strength
  skin: number;
  hair: number;
  brows: number;
  iris: number;
  teeth: number; // 0 = closed smile, 1 = full toothy smile
  shirt: number;
  mouthWidth: number;
};

export const defaultLikeness: LikenessOptions = {
  smile: 0.11,
  cheeks: 0.03,
  eyeOpen: 0.3,
  hairLift: 0.052,
  hairForward: 0.0,
  hairline: 0.045,
  browArch: 0.045,
  earScale: 0.8,
  stubble: 0.3,
  skin: 0xd19a74,
  hair: 0x2a1c14,
  brows: 0x1c130e,
  iris: 0x8f5c34,
  teeth: 0,
  shirt: 0xf4f4f1,
  mouthWidth: 0.96,
};

const gauss = (v: number, s: number) => Math.exp(-(v * v) / (2 * s * s));
const smooth = (a: number, b: number, v: number) => {
  const t = Math.min(1, Math.max(0, (v - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

// Face landmarks in the head mesh's bind space (measured from the model).
const MOUTH_Y = 12.62;
const MOUTH_HALF_W = 0.44;

function smileAndEyes(head: THREE.Mesh, o: LikenessOptions) {
  const g = head.geometry;
  const pos = g.attributes.position as THREE.BufferAttribute;

  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const z = pos.getZ(i);
    if (z < 0.2) continue; // front of the face only

    const ax = Math.abs(x);
    // U-shaped smile: lift grows with distance from the centre, peaks at the corners
    // and fades out across the cheek.
    const u = Math.pow(Math.min(ax, MOUTH_HALF_W) / MOUTH_HALF_W, 2);
    const fade = gauss(Math.max(0, ax - MOUTH_HALF_W), 0.16);
    const band = gauss(y - MOUTH_Y, 0.11);
    const side = x < 0 ? 1.25 : 1;
    let dy = o.smile * u * fade * band * side;
    let dz = -0.25 * o.smile * u * fade * band;

    // Apple-of-cheek lift and a touch of fullness.
    const cheek = gauss(ax - 0.55, 0.2) * gauss(y - (MOUTH_Y + 0.28), 0.18);
    dy += o.cheeks * cheek;
    dz += o.cheeks * 0.9 * cheek;

    if (dy || dz) pos.setXYZ(i, x, y + dy, z + dz);
  }
  pos.needsUpdate = true;
  g.computeVertexNormals();

  // Bake part of the blink morphs in reverse so the lids sit more open (less sleepy).
  const morphs = g.morphAttributes.position;
  const dict = head.morphTargetDictionary ?? {};
  if (morphs && o.eyeOpen) {
    ["Key 2", "eyeL_100"].forEach((name) => {
      const idx = dict[name];
      if (idx === undefined) return;
      const delta = morphs[idx] as THREE.BufferAttribute;
      for (let i = 0; i < pos.count; i++) {
        pos.setXYZ(
          i,
          pos.getX(i) - o.eyeOpen * delta.getX(i),
          pos.getY(i) - o.eyeOpen * delta.getY(i),
          pos.getZ(i) - o.eyeOpen * delta.getZ(i)
        );
      }
    });
    pos.needsUpdate = true;
  }
  g.computeBoundingSphere();
}

function stubbleShader(material: THREE.MeshStandardMaterial, o: LikenessOptions) {
  if (!o.stubble) return;
  material.onBeforeCompile = (shader) => {
    shader.uniforms.uStubble = { value: o.stubble };
    shader.vertexShader = shader.vertexShader
      .replace("#include <common>", "#include <common>\nvarying vec3 vRgBind;")
      .replace("#include <begin_vertex>", "#include <begin_vertex>\nvRgBind = position;");
    shader.fragmentShader = shader.fragmentShader
      .replace(
        "#include <common>",
        `#include <common>
varying vec3 vRgBind;
uniform float uStubble;
float rgHash(vec3 p) { p = fract(p * 0.3183099 + 0.1); p *= 17.0; return fract(p.x * p.y * p.z * (p.x + p.y + p.z)); }`
      )
      .replace(
        "#include <color_fragment>",
        `#include <color_fragment>
{
  vec3 p = vRgBind;
  float ax = abs(p.x);
  float front = smoothstep(-0.2, 0.3, p.z);
  // chin + jaw, a gentle rise towards the sides (no hard sideburn edge)
  float jawTop = 12.5 + 0.28 * smoothstep(0.35, 1.0, ax);
  float jaw = (1.0 - smoothstep(jawTop - 0.16, jawTop + 0.1, p.y)) * smoothstep(11.98, 12.2, p.y);
  // soft moustache between mouth and nose
  float stache = smoothstep(12.64, 12.7, p.y) * (1.0 - smoothstep(12.78, 12.86, p.y)) * (1.0 - smoothstep(0.3, 0.46, ax));
  float lips = (1.0 - smoothstep(0.015, 0.05, abs(p.y - 12.625))) * (1.0 - smoothstep(0.38, 0.46, ax));
  float mask = clamp(max(jaw, 0.85 * stache) - lips, 0.0, 1.0) * front;
  float grain = 0.8 + 0.2 * rgHash(floor((p - vec3(0.0, 12.0, 0.0)) * 520.0));
  diffuseColor.rgb = mix(diffuseColor.rgb, diffuseColor.rgb * vec3(0.6, 0.5, 0.45), mask * uStubble * grain);
}`
      );
  };
  material.customProgramCacheKey = () => `rg-stubble-${o.stubble}`;
  material.needsUpdate = true;
}

function pompadour(hair: THREE.Mesh, o: LikenessOptions) {
  const pos = hair.geometry.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const z = pos.getZ(i);
    const top = smooth(-0.02, 0.12, y);
    const front = smooth(-0.09, 0.12, z);
    const centre = gauss(x, 0.09);
    // raise the fringe edge so more forehead shows, like a swept-back pompadour
    const fringe = smooth(0.03, 0.11, z) * (1 - smooth(-0.04, 0.08, y));
    // quiff: tallest at the front-centre, sweeping back and down to the crown
    const quiff = top * front * (0.5 + 0.5 * centre);
    const dy = o.hairLift * (0.3 * top + quiff) + o.hairline * fringe;
    const dz = o.hairForward * top * front - 0.4 * o.hairline * fringe;
    pos.setXYZ(i, x, y + dy, z + dz);
  }
  pos.needsUpdate = true;
  hair.geometry.computeVertexNormals();
  hair.geometry.computeBoundingSphere();
}

function archBrows(brows: THREE.Mesh, o: LikenessOptions) {
  const pos = brows.geometry.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const ax = Math.abs(x);
    // peak a little outside the brow centre (≈0.43), tail drops slightly
    const arch = gauss(ax - 0.47, 0.17) - 0.35 * smooth(0.6, 0.76, ax);
    pos.setY(i, pos.getY(i) + o.browArch * arch);
  }
  pos.needsUpdate = true;
  brows.geometry.computeBoundingSphere();
}

function shrinkEars(ears: THREE.Mesh, o: LikenessOptions) {
  if (o.earScale === 1) return;
  const pos = ears.geometry.attributes.position as THREE.BufferAttribute;
  // pivot on the edge that attaches to the head so the ears stay connected
  const pivot = (sign: number) => new THREE.Vector3(0.84 * sign, 13.12, 0.1);
  const L = pivot(-1);
  const R = pivot(1);
  const v = new THREE.Vector3();
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    const p = v.x < 0 ? L : R;
    v.sub(p).multiplyScalar(o.earScale).add(p);
    pos.setXYZ(i, v.x, v.y, v.z);
  }
  pos.needsUpdate = true;
  ears.geometry.computeBoundingSphere();
}

function recolorIris(eyes: THREE.Mesh, o: LikenessOptions) {
  const material = eyes.material as THREE.MeshStandardMaterial;
  const src = material.map?.image as CanvasImageSource & { width: number; height: number };
  if (!src?.width) return;
  const canvas = document.createElement("canvas");
  canvas.width = src.width;
  canvas.height = src.height;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return;
  ctx.drawImage(src, 0, 0);
  const img = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const d = img.data;
  const target = new THREE.Color(o.iris);
  const hsl = { h: 0, s: 0, l: 0 };
  const tmp = new THREE.Color();
  for (let i = 0; i < d.length; i += 4) {
    tmp.setRGB(d[i] / 255, d[i + 1] / 255, d[i + 2] / 255);
    tmp.getHSL(hsl);
    // purple/blue iris pixels → warm dark brown, keeping their shading
    if (hsl.s > 0.18 && hsl.h > 0.55 && hsl.h < 0.92) {
      const shade = Math.min(1.25, 0.45 + hsl.l * 1.4);
      d[i] = Math.min(255, target.r * 255 * shade);
      d[i + 1] = Math.min(255, target.g * 255 * shade);
      d[i + 2] = Math.min(255, target.b * 255 * shade);
    }
  }
  ctx.putImageData(img, 0, 0);
  const tex = new THREE.CanvasTexture(canvas);
  const old = material.map!;
  tex.flipY = old.flipY;
  tex.colorSpace = old.colorSpace;
  tex.wrapS = old.wrapS;
  tex.wrapT = old.wrapT;
  tex.channel = old.channel;
  material.map = tex;
  material.needsUpdate = true;
}

// Builds an open, toothy smile: a dark mouth crescent with a row of upper teeth,
// projected onto the face surface and parented to the head bone so it follows the head.
function toothySmile(character: THREE.Object3D, head: THREE.Mesh, o: LikenessOptions) {
  if (!o.teeth) return;
  const bone = character.getObjectByName("spine006");
  if (!bone) return;
  character.updateMatrixWorld(true);

  const ray = new THREE.Raycaster();
  const inv = new THREE.Matrix4().copy(head.matrixWorld);
  const dir = new THREE.Vector3(0, 0, -1).transformDirection(inv);
  const W = MOUTH_HALF_W * o.mouthWidth;

  // Crescent: top edge follows the smiling mouth line, bottom edge is a deep curve.
  const build = (scaleW: number, depth: number, lift: number, push: number, color: number, rough: number, glow = 0) => {
    const cols = 28;
    const rows = 6;
    const pts: THREE.Vector3[] = [];
    for (let r = 0; r <= rows; r++) {
      for (let c = 0; c <= cols; c++) {
        const t = (c / cols) * 2 - 1; // -1..1
        const x = t * W * scaleW;
        const u = Math.min(1, Math.abs(x) / MOUTH_HALF_W) ** 2;
        const topY = MOUTH_Y + o.smile * 0.9 * u + lift;
        const botY = topY - depth * (1 - t * t) ** 0.8;
        const y = topY + (botY - topY) * (r / rows);
        const origin = new THREE.Vector3(x, y, 3).applyMatrix4(head.matrixWorld);
        ray.set(origin, dir);
        const hit = ray.intersectObject(head, false)[0];
        const pnt = hit ? hit.point.clone() : origin.clone().addScaledVector(dir, 2.1);
        if (hit?.face) {
          const n = hit.face.normal.clone().transformDirection(head.matrixWorld);
          pnt.addScaledVector(n, push);
        }
        pts.push(pnt);
      }
    }
    const geo = new THREE.BufferGeometry().setFromPoints(pts);
    const idx: number[] = [];
    for (let r = 0; r < rows; r++)
      for (let c = 0; c < cols; c++) {
        const a = r * (cols + 1) + c;
        const b = a + 1;
        const d = a + cols + 1;
        const e = d + 1;
        idx.push(a, d, b, b, d, e);
      }
    geo.setIndex(idx);
    geo.computeVertexNormals();
    const material = new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: 0, side: THREE.DoubleSide });
    if (glow) material.emissive.set(glow);
    const mesh = new THREE.Mesh(geo, material);
    mesh.renderOrder = 2;
    character.add(mesh);
    mesh.applyMatrix4(new THREE.Matrix4().copy(character.matrixWorld).invert());
    bone.attach(mesh);
    return mesh;
  };

  const depth = 0.13 * o.teeth;
  build(1.0, depth, 0.004, 0.006, 0x3a1513, 0.8); // mouth / lip line
  build(0.88, depth * 0.62, -0.006, 0.009, 0xfffcf7, 0.3); // upper teeth
}

// White zip polo: recolours the shirt, draws a zip placket in the shader and adds a
// folded collar that follows the chest bone.
const NECK = { cz: -0.36, rx: 0.46, rz: 0.41, yFront: 11.87, yBack: 12.15 };

function poloShirt(character: THREE.Object3D, shirt: THREE.Mesh, o: LikenessOptions) {
  const material = (shirt.material as THREE.MeshStandardMaterial).clone();
  material.color.set(o.shirt);
  material.roughness = 0.88;
  material.metalness = 0;
  material.onBeforeCompile = (shader) => {
    shader.vertexShader = shader.vertexShader
      .replace("#include <common>", "#include <common>\nvarying vec3 vRgShirt;")
      .replace("#include <begin_vertex>", "#include <begin_vertex>\nvRgShirt = position;");
    shader.fragmentShader = shader.fragmentShader
      .replace("#include <common>", "#include <common>\nvarying vec3 vRgShirt;")
      .replace(
        "#include <color_fragment>",
        `#include <color_fragment>
{
  vec3 p = vRgShirt;
  float ax = abs(p.x);
  float front = smoothstep(-0.1, 0.05, p.z);
  float span = smoothstep(11.05, 11.12, p.y) * (1.0 - smoothstep(11.86, 11.9, p.y)) * front;
  // placket edges (stitch lines)
  float edge = (1.0 - smoothstep(0.004, 0.012, abs(ax - 0.075))) * span;
  // zip tape + teeth
  float tape = (1.0 - smoothstep(0.022, 0.03, ax)) * span;
  float teeth = step(0.5, fract(p.y * 95.0)) * (1.0 - smoothstep(0.008, 0.012, ax)) * span;
  // zip pull near the top
  float pull = (1.0 - smoothstep(0.03, 0.036, ax)) * smoothstep(11.68, 11.7, p.y) * (1.0 - smoothstep(11.8, 11.82, p.y)) * front;
  diffuseColor.rgb *= 1.0 - 0.18 * edge;
  diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.86, 0.86, 0.85), tape * 0.6);
  diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.55, 0.56, 0.58), teeth * 0.85);
  diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.42, 0.43, 0.46), pull);
}`
      );
  };
  material.customProgramCacheKey = () => "rg-polo";
  shirt.material = material;

  // Folded collar built around the shirt's neckline (bind space → world → chest bone).
  const bone = character.getObjectByName("spine003");
  if (!bone) return;
  character.updateMatrixWorld(true);
  const seg = 48;
  const rings = 4;
  const gap = THREE.MathUtils.degToRad(9);
  const ray = new THREE.Raycaster();
  const down = new THREE.Vector3(0, -1, 0);
  const shade: number[] = [];
  const pts: THREE.Vector3[] = [];
  for (let r = 0; r < rings; r++) {
    for (let i = 0; i <= seg; i++) {
      const phi = gap + (i / seg) * (Math.PI * 2 - 2 * gap); // 0 = centre front
      const frontness = Math.max(0, Math.cos(phi));
      const yBase = NECK.yFront + (NECK.yBack - NECK.yFront) * ((1 - Math.cos(phi)) / 2);
      // r0: seam on the neckline, r1: top of the stand, r2: fold edge lying on the shirt
      // (wider with pointed tips at the front, like a polo collar)
      // r3: a thin shadow lip just under the fold edge so the white collar reads on a white shirt
      const scale = [1.02, 1.0, 1.42 + 0.18 * frontness ** 2, 1.47 + 0.18 * frontness ** 2][r];
      const v = new THREE.Vector3(
        NECK.rx * scale * Math.sin(phi),
        yBase + [-0.01, 0.17, 0, 0][r],
        NECK.cz + NECK.rz * scale * Math.cos(phi)
      ).applyMatrix4(shirt.matrixWorld);
      if (r >= 2) {
        ray.set(v.clone().add(new THREE.Vector3(0, 3, 0)), down);
        const hit = ray.intersectObject(shirt, false)[0];
        if (hit) v.y = hit.point.y + (r === 2 ? 0.035 : 0.012);
      }
      shade.push(...Array(3).fill([0.8, 0.9, 1, 0.42][r]));
      pts.push(v);
    }
  }
  const geo = new THREE.BufferGeometry().setFromPoints(pts);
  geo.setAttribute("color", new THREE.Float32BufferAttribute(shade, 3));
  const idx: number[] = [];
  for (let r = 0; r < rings - 1; r++)
    for (let i = 0; i < seg; i++) {
      const a = r * (seg + 1) + i;
      const b = a + 1;
      const c = a + seg + 1;
      const d = c + 1;
      idx.push(a, c, b, b, c, d);
    }
  geo.setIndex(idx);
  geo.computeVertexNormals();
  const collar = new THREE.Mesh(
    geo,
    new THREE.MeshStandardMaterial({ color: o.shirt, roughness: 0.9, side: THREE.DoubleSide, vertexColors: true })
  );
  collar.name = "PoloCollar";
  collar.castShadow = true;
  character.add(collar);
  collar.applyMatrix4(new THREE.Matrix4().copy(character.matrixWorld).invert());
  bone.attach(collar);
}

const tint = (mesh: THREE.Mesh | undefined, color: number, roughness?: number) => {
  if (!mesh) return;
  const material = (mesh.material as THREE.MeshStandardMaterial).clone();
  material.color.set(color);
  if (roughness !== undefined) material.roughness = roughness;
  mesh.material = material;
};

export default function applyLikeness(
  character: THREE.Object3D,
  overrides: Partial<LikenessOptions> = {}
) {
  const o = { ...defaultLikeness, ...overrides };
  const get = (name: string) => {
    let found: THREE.Mesh | undefined;
    character.traverse((obj) => {
      if (!found && obj.name === name && (obj as THREE.Mesh).isMesh) found = obj as THREE.Mesh;
    });
    return found;
  };

  const head = get("Plane007");
  const hair = get("hair");
  const brows = get("Eyebrow");
  const ears = get("Ear001");
  const eyes = get("EYEs001");

  if (head) {
    smileAndEyes(head, o);
    toothySmile(character, head, o);
    (head.material as THREE.MeshStandardMaterial).color.set(o.skin);
    stubbleShader(head.material as THREE.MeshStandardMaterial, o);
  }
  ["Ear001", "Neck", "Hand"].forEach((n) => {
    const m = get(n);
    if (m) (m.material as THREE.MeshStandardMaterial).color.set(o.skin);
  });
  if (hair) {
    pompadour(hair, o);
    tint(hair, o.hair, 0.36);
  }
  if (brows) {
    archBrows(brows, o);
    tint(brows, o.brows, 0.7);
  }
  if (ears) shrinkEars(ears, o);
  const shirt = get("BODYSHIRT");
  if (shirt) poloShirt(character, shirt, o);
  // dark trousers
  tint(get("Pant"), 0x101012, 0.8);
  if (eyes) recolorIris(eyes, o);
}
