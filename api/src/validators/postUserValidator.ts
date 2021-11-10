import * as yup from 'yup';

export const postUserValidator: yup.AnyObjectSchema = yup.object({
    name: yup.string().required()
})