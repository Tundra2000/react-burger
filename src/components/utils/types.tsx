
export interface IBun {
    type: "top" | "bottom";
    isLocked: boolean;
    text: string;
    price: number;
    thumbnail: string;
  }


  export interface IIngredient{
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v?: number;
  }

  export interface IConstructorIngredient extends IIngredient {
    uuid: string;
    //index: number;
  }