import Joi from "joi";

export type ISchema<T extends object> = Joi.ObjectSchema<T>;
