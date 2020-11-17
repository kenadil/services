import * as Yup from "yup";

const RecordSchema = Yup.object().shape({
    name: Yup.string().required("Cannot be empty!"),
    enrollments: Yup.number().required("Cannot be empty!").min(0).max(8),
    gpa: Yup.number().required("Cannot be empty!").min(0).max(4),
    category: Yup.string().required("Cannot be empty!"),
});

export default RecordSchema;