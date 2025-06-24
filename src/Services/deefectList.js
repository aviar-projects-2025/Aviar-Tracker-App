import httpClient from "../Config/httpClient";
function defectProject() {
  return httpClient({
    url: "/projects/get/all",
    method: "GET",
  });
}
const DefectServices = { defectProject };
export default DefectServices;
