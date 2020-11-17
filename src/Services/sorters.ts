import moment from "moment";

export const sortKey = {
  compare: (a: any, b: any) => a.key - b.key,
  multiple: 4,
};

export const sortDate = {
  compare: (a: any, b: any) => moment(a.date).unix() - moment(b.date).unix(),
  multiple: 3,
};

export const sortEnrollments = {
  compare: (a: any, b: any) => a.enrollments - b.enrollments,
  multiple: 2,
};

export const sortGPA = {
  compare: (a: any, b: any) => a.gpa - b.gpa,
  multiple: 1,
};
