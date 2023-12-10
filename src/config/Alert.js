import Swal from "sweetalert2";

const Alert = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-pri",
    cancelButton: "btn btn-pri-outline",
  },
  buttonsStyling: false,
});

export default Alert;
