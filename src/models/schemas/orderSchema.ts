import Joi from "joi";

export const orderSchema = {
  params: Joi.object().keys({
    orderId: Joi.string().hex().length(24).required(),
  }),
};
