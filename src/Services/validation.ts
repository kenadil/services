import * as Yup from "yup";

const RecordSchema = Yup.object().shape({
    name: Yup.string().required("Cannot be empty!"),
    key: Yup.string().email("Invalid email").required("Cannot be empty!"),
    gpa: Yup.number().required("Cannot be empty!").min(0).max(4),
    category: Yup.string().required("Cannot be empty!"),
});

export const ChangeCategorySchema = Yup.object().shape({ 
    category: Yup.string().required("Cannot be empty!"),
});

export default RecordSchema;