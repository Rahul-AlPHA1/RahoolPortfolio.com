import * as THREE from "three";

// "Hi 👋" greeting: raises the character's left arm (screen right, clear of the hero
// text) next to the face, opens the palm towards the
// viewer and waves a few times. Built as an additive clip so it layers on top of the
// intro/typing pose instead of replacing it.

const FPS = 30;
const DURATION = 3.4;
const RISE = 0.55;
const FALL = 0.6;
const WAVES = 3;

const X = new THREE.Vector3(1, 0, 0);
const Y = new THREE.Vector3(0, 1, 0);
const Z = new THREE.Vector3(0, 0, 1);

const easeOutBack = (t: number) => {
  const c = 1.4;
  return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2);
};
const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

const envelope = (t: number) => {
  if (t < RISE) return easeOutBack(t / RISE);
  if (t > DURATION - FALL) return 1 - easeInOut((t - (DURATION - FALL)) / FALL);
  return 1;
};

const SIDE = "L";
const MIRROR = -1; // left-side bones mirror the Y/Z axes of the right side

const fingerBones = ["f_index01", "f_index02", "f_middle01", "f_middle02", "f_ring01", "f_ring02", "f_pinky01", "f_pinky02"].map(
  (b) => `${b}${SIDE}`
);

export function createWaveAction(mixer: THREE.AnimationMixer, character: THREE.Object3D) {
  const times: number[] = [];
  const frames = Math.round(DURATION * FPS);
  for (let i = 0; i <= frames; i++) times.push(i / FPS);

  const track = (bone: string, pose: (t: number, e: number) => THREE.Quaternion) => {
    if (!character.getObjectByName(bone)) return null;
    const values: number[] = [];
    times.forEach((t) => values.push(...pose(t, Math.max(0, envelope(t))).toArray()));
    return new THREE.QuaternionKeyframeTrack(`${bone}.quaternion`, times, values);
  };

  const q = (axis: THREE.Vector3, angle: number) => new THREE.Quaternion().setFromAxisAngle(axis, angle);
  const waveAngle = (t: number) => {
    const active = Math.min(1, Math.max(0, (t - RISE * 0.6) / 0.3)) * (t < DURATION - FALL ? 1 : 0.4);
    return 0.28 * Math.sin(((t - RISE * 0.6) / (DURATION - RISE - FALL)) * WAVES * Math.PI * 2) * active;
  };

  const tracks = [
    // arm up beside the face
    track(`upper_arm${SIDE}`, (_, e) => q(X, 1.2 * e).multiply(q(Y, MIRROR * 1.05 * e))),
    // forearm swings side to side
    track(`forearm${SIDE}`, (t, e) => q(Z, waveAngle(t) * e)),
    // palm towards the viewer
    track(`hand${SIDE}`, (_, e) => q(Y, MIRROR * 0.9 * e)),
    // open the fingers from the typing curl
    ...fingerBones.map((b) => track(b, (_, e) => q(X, 0.5 * e))),
  ].filter((t): t is THREE.QuaternionKeyframeTrack => t !== null);

  const clip = new THREE.AnimationClip("wave", DURATION, tracks);
  const action = mixer.clipAction(clip);
  action.blendMode = THREE.AdditiveAnimationBlendMode;
  action.setLoop(THREE.LoopOnce, 1);
  action.clampWhenFinished = false;
  return action;
}
