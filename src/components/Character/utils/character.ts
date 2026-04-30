import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
import { decryptFile } from "./decrypt";

const publicAsset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath(publicAsset("draco/"));
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = () => {
    return new Promise<GLTF | null>(async (resolve, reject) => {
      try {
        const encryptedBlob = await decryptFile(
          publicAsset("models/character.enc"),
          "Character3D#@"
        );
        const blobUrl = URL.createObjectURL(new Blob([encryptedBlob]));

        let character: THREE.Object3D;
        loader.load(
          blobUrl,
          async (gltf) => {
            character = gltf.scene;
            await renderer.compileAsync(character, camera, scene);
            character.traverse((child: any) => {
              if (child.isMesh) {
                const mesh = child as THREE.Mesh;
                child.castShadow = true;
                child.receiveShadow = true;
                mesh.frustumCulled = true;
                const meshName = `${mesh.name} ${mesh.parent?.name ?? ""}`;
                const normalizedName = meshName.toLowerCase();

                const isHeadSurface = /plane\.?0?07/.test(normalizedName);
                const isSuit = /body|shirt/.test(normalizedName);
                const isSkin =
                  /hand|neck|ear|face|head/.test(normalizedName) ||
                  isHeadSurface;
                const isClothingOrHair =
                  /pant|shoe|sole|hair|eyebrow|eye/.test(normalizedName);

                const isMaterialArray = Array.isArray(mesh.material);
                const materials: THREE.Material[] = isMaterialArray
                  ? (mesh.material as THREE.Material[])
                  : [mesh.material as THREE.Material];

                materials.forEach((material: any, index: number) => {
                  if (!material?.color) return;

                  if (isClothingOrHair || (!isSkin && !isSuit)) return;

                  const styledMaterial = material.clone();
                  styledMaterial.color.set(isSuit ? 0x050505 : 0xd49a73);
                  styledMaterial.roughness = isSuit ? 0.78 : 0.68;
                  styledMaterial.metalness = isSuit ? 0.04 : 0.02;

                  styledMaterial.needsUpdate = true;
                  if (isMaterialArray) {
                    (mesh.material as THREE.Material[])[index] = styledMaterial;
                  } else {
                    mesh.material = styledMaterial;
                  }
                });
              }
            });
            resolve(gltf);
            setCharTimeline(character, camera);
            setAllTimeline();
            character!.getObjectByName("footR")!.position.y = 3.36;
            character!.getObjectByName("footL")!.position.y = 3.36;
            dracoLoader.dispose();
          },
          undefined,
          (error) => {
            console.error("Error loading GLTF model:", error);
            reject(error);
          }
        );
      } catch (err) {
        reject(err);
        console.error(err);
      }
    });
  };

  return { loadCharacter };
};

export default setCharacter;
