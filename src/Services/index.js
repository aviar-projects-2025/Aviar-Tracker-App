import httpClient from "../Config/httpClient";

function login(payload) {
  return httpClient({
    url: "user/login",
    method: "POST",
    data: {
      ...payload,
    },
  });
}

//AdminDashboard get list
function AdminDashboardgetList(payload) {
  return httpClient({
    url: "employe/list",
    method: "GET",
    data: {
      ...payload,
    },
  });
}
function EmployeeCreate(payload) {
  return httpClient({
    url: "user/",
    method: "POST",
    data: {
      ...payload,
    },
  });
}

function getAllUsers(payload) {
  return httpClient({
    url: "user/",
    method: "GET",
    data: {
      ...payload,
    },
  });
}

function EmployeeEdit(payload, userId, adminRole) {
  return httpClient({
    url: `/user/${userId}`,
    method: "PATCH",
    data: {
      ...payload,
      adminRole,
    },
  });
}
function EmployeeStatus(payload, id) {
  return httpClient({
    url: "employe/status",
    method: "PATCH",
    data: {
      status: payload,
      empId: id,
    },
  });
}

function getUserDetails(userId) {
  return httpClient({
    url: `employe/${userId}`,
    method: "GET",
  });
}
function getEmployeeAttendance(employeeId) {
  return httpClient({
    url: `employee/get/${employeeId}`,
    method: "GET",
  });
}

function createEmployeeAttendance(payload) {
  return httpClient({
    url: "employee/create",
    method: "POST",
    data: {
      ...payload,
    },
  });
}
function createProject(payload) {
  return httpClient({
    url: "projects/create",
    method: "POST",
    data: {
      ...payload,
    },
  });
}

function createProjectUsers(payLoad, pathData) {
  return httpClient({
    url: "projectUser/create",
    method: "POST",
    data: {
      ...payLoad,
      projectId: pathData?.id,
      projectName: pathData?.name,
    },
  });
}

function getProjectAlldata(data) {
  return httpClient({
    url: "projects/get/all",
    method: "GET",
  });
}
function updateProject(payload, id) {
  return httpClient({
    url: `projects/update/${id}`,
    method: "PATCH",
    data: {
      ...payload,
    },
  });
}
function createDefects(payload, id) {
  return httpClient({
    url: `/defects/create/${id}`,
    method: "POST",
    data: {
      ...payload,
    },
  });
}

function getDefects(id) {
  return httpClient({
    url: `/defects/data/${id}`,
    method: "GET",
  });
}

function createDefectlist(payLoad, projectData, reportedBy, description) {
  // const data = projectData?.id ? projectData : payLoad?.projectName?.value;
  // const data = projectData?.id ? projectData : projectData?.values ;
  const data = projectData?.id ? projectData : projectData?.defectData;
  return httpClient({
    url: "/defects/list/create",
    method: "POST",
    data: {
      ...payLoad,
      ...data,
      ...reportedBy,
      ...description,
    },
  });
}

function getDefectListData(id) {
  return httpClient({
    url: `/defects/list/${id}`,
    method: "GET",
  });
}
function updateAssignee(values, id, defectData, userId) {
  return httpClient({
    url: `/defects/assignedto/${id}`,
    method: "PATCH",
    data: {
      ...values,
      ...defectData,
      userId,
    },
  });
}

function getProjectUsers(id) {
  return httpClient({
    url: `/projectUser/get/project/users/${id}`,
    method: "GET",
  });
}

function updateProjectUsers(values, id) {
  return httpClient({
    url: `/projectUser/update/${id}`,
    method: "PATCH",
    data: {
      ...values,
    },
  });
}

function uploadImage(payload, id) {
  return httpClient({
    url: "/defects/image/upload",
    method: "POST",
    data: {
      ...payload,
      id,
    },
  });
}

function updateDefectDetails(id, data, defectData, reportedBy) {
  return httpClient({
    url: `/defects/edit/${id}`,
    method: "PATCH",
    data: { ...data, defectData, reportedBy },
  });
}
function DefectListGet() {
  return httpClient({
    url: "/defects/get/all/defect/list",
    method: "GET",
  });
}
function DefectAttachment(payLoad, defectData) {
  return httpClient({
    url: "/defectsAttachment/create/defect/attachment",
    method: "POST",
    data: {
      ...payLoad,
      ...defectData,
    },
  });
}

function getDefectAttachment(id) {
  return httpClient({
    url: `/defectsAttachment/get/attachment/${id}`,
    method: "GET",
  });
}

function attachmentUpload(payload, id) {
  return httpClient({
    url: "/defectsAttachment/attachment/upload",
    method: "POST",
    data: {
      ...payload,
      id,
    },
  });
}

function editAttachment(payLoad, id) {
  return httpClient({
    url: `/defectsAttachment/edit/attachment/${id}`,
    method: "PATCH",
    data: {
      ...payLoad,
      id,
    },
  });
}

function attachmentDelete(id) {
  return httpClient({
    url: `/defectsAttachment/delete/${id}`,
    method: "DELETE",
  });
}

function projectUserDelete(id) {
  return httpClient({
    url: `/projectUser/delete/${id}`,
    method: "DELETE",
  });
}
function getDefecHistory(id) {
  return httpClient({
    url: `/defecthistory/${id}`,
    method: "GET",
  });
}
function createStatus(payload) {
  return httpClient({
    url: "/status/",
    method: "POST",
    data: { ...payload },
  });
}
function getStatus(id) {
  return httpClient({
    url: `/status/project/get/${id}`,
    method: "GET",
  });
}

function createPriority(payload) {
  return httpClient({
    url: "/priority/",
    method: "POST",
    data: { ...payload },
  });
}

function getPriority(id) {
  return httpClient({
    url: `/priority/project/get/${id}`,
    method: "GET",
  });
}
function requestCode(payLoad) {
  return httpClient({
    url: `user/foget/password`,
    method: "PATCH",
    data: {
      ...payLoad,
    },
  });
}
function checkCode(payLoad) {
  return httpClient({
    url: `user/code/verification`,
    method: "PATCH",
    data: {
      ...payLoad,
    },
  });
}
function changePassword(payLoad) {
  return httpClient({
    url: `user/update/new/password`,
    method: "PATCH",
    data: {
      ...payLoad,
    },
  });
}
function createProjectStatus(payLoad, projectData) {
  return httpClient({
    url: "projectStatus/create",
    method: "POST",
    data: {
      ...payLoad,
      ...projectData,
    },
  });
}
function getProjectStatus() {
  return httpClient({
    url: `projectStatus/get/status`,
    method: "GET",
  });
}
function projectStatusDelete(id) {
  return httpClient({
    url: `projectStatus/delete/${id}`,
    method: "DELETE",
  });
}
function craeteLoginStatus(payload) {
  return httpClient({
    url: `loginStatus/create`,
    method: "POST",
    data: {
      ...payload,
    },
  });
}
function updateLoginStatus(payload) {
  return httpClient({
    url: `loginStatus/create`,
    method: "PATCH",
    data: {
      ...payload,
    },
  });
}
function getLoginStatus(id) {
  return httpClient({
    url: `loginStatus/get/${id}`,
    method: "GET",
  });
}

function getEmployeeLoginStatus(id) {
  return httpClient({
    url: `loginStatus/get/status/${id}`,
    method: "GET",
  });
}
function updateLeaveStatus(payLoad) {
  return httpClient({
    url: `/employee/leave/update/status/${payLoad.employeeid}`,
    method: "PATCH",
    data: {
      ...payLoad,
    },
  });
}
function profilePhotoUpdate(payLoad, id) {
  return httpClient({
    url: `/employee/profile/update`,
    method: "PATCH",
    data: {
      ...payLoad,
      id,
    },
  });
}

const Services = {
  login,
  AdminDashboardgetList,
  EmployeeCreate,
  EmployeeEdit,
  EmployeeStatus,
  getUserDetails,
  getEmployeeAttendance,
  createEmployeeAttendance,
  createProject,
  getProjectAlldata,
  updateProject,
  createProjectUsers,
  getProjectUsers,
  updateProjectUsers,
  createDefects,
  getDefects,
  updateAssignee,
  createDefectlist,
  getDefectListData,
  uploadImage,
  updateDefectDetails,
  DefectListGet,
  projectUserDelete,
  createPriority,
  getPriority,
  DefectAttachment,
  getDefectAttachment,
  attachmentUpload,
  editAttachment,
  attachmentDelete,
  getDefecHistory,
  createStatus,
  getStatus,
  requestCode,
  checkCode,
  changePassword,
  getAllUsers,
  createProjectStatus,
  getProjectStatus,
  projectStatusDelete,
  craeteLoginStatus,
  updateLoginStatus,
  getLoginStatus,
  getEmployeeLoginStatus,
  updateLeaveStatus,
  profilePhotoUpdate,
};

export default Services;
