import * as yup from 'yup';

export const postResetPasswordValidator: yup.AnyObjectSchema = yup.object({
    password: yup.string().required('Campo obrigatório'),
    token: yup.string().required()
})