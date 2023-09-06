import {
  SofaMat1, SofaMat2, SofaMat3, SofaMat4, SofaMat5,
  BedMat1, BedMat2, BedMat3, BedMat4, BedMat5,
  Wood1, Wood2, Wood3,
} from "./ImageInfo";

export const ModelInfo = [
  {
    id: 1,
    name: 'SOFA',
    obj_1: {
      obj_name: 'Mattress',
      obj_content: [SofaMat1, SofaMat2, SofaMat3, SofaMat4, SofaMat5]
    },
    obj_3: {
      obj_name: 'Pattern',
      obj_content: [SofaMat2, SofaMat3, SofaMat4]
    },
    obj_4: {
      obj_name: 'Pillow',
      obj_content: [SofaMat1, SofaMat2, SofaMat3, SofaMat4]
    },
  },
  {
    id: 2,
    name: 'BED',
    obj_1: {
      obj_name: 'Mattress',
      obj_content: [BedMat1, BedMat2, BedMat3, BedMat4, BedMat5]
    },
    obj_2: {
      obj_name: 'Pattern',
      obj_content: [Wood1, Wood2, Wood3]
    },
    obj_3: {
      obj_name: 'Crossbeam',
      obj_content: [Wood1, Wood2, Wood3]
    }
  },
]