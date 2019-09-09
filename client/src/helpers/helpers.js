import { statusImage } from "../constants/image_ids";

const convertDateToString = date => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}-${month}-${day}`
}

const determineUserAttendanceStatusAndImage = score => {
  if (score < 20) {
    return { "Sloth": statusImage.sloth }
  } else {
    return { "Eager Beaver": statusImage.beaver }
  }
};

export { convertDateToString, determineUserAttendanceStatusAndImage };