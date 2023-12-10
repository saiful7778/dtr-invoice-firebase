import Swal from "sweetalert2";

const Alert = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-pri m-1",
    cancelButton: "btn btn-pri-outline m-1",
  },
  buttonsStyling: false,
});

export default Alert;
