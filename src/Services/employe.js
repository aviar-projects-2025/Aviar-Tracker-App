import httpClient from "../Config/httpClient";
function getDevDefectList(id) {
  return httpClient({
    url: `/defects/get/developer/defect/${id}`,
    method: "GET",
  });
}

const EmpServices = { getDevDefectList };
export default EmpServices;
