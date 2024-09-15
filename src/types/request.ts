import Joi from "joi";

export interface IRequest<T extends object = object> {
    data?: T;
    scheam: Joi.ObjectSchema<T>;
}
