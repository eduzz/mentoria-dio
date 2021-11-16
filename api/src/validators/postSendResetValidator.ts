import * as yup from 'yup';

export const postSendResetValidator: yup.AnyObjectSchema = yup.object({
    email: yup.string().required('Campo obrigatório').email('Campo deve ser um e-mail válido')
})