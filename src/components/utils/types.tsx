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
}

export interface ICheckSuccess {
  success: boolean;
}
    
export interface IRegisterRequest {
  email: string;
  password: string;
  name: string;
}

export interface IRegisterResponse extends ICheckSuccess {
  accessToken: string;
  refreshToken: string;
  user: {
    email: string;
    name: string;
  };
}