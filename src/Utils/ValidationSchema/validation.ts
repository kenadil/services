import * as Yup from "yup";

export const PopularSchema = Yup.object().shape({
  ders_kod: Yup.string().required("Cannot be empty!"),
  year: Yup.number().required("Cannot be empty!").min(2017).max(2019),
  term: Yup.number().required("Cannot be empty!"),
});
