import Swal from "sweetalert2";
import {
  getSetting,
  updateProfile,
} from "../../../services/superadmin/Setting";
import { useEffect, useState } from "react";

export const useSettings = () => {
  const [previewPassword, setPreviewPassword] = useState(false);
  const [edit, setEdit] = useState({
    Email: false,
    Name: false,
    Username: false,
    Password: false,
  });
  const [value, setValue] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });

  useEffect(() => {
    const fetchSetting = async () => {
      try {
        const res = await getSetting();
        setValue({
          email: res.email,
          name: res.name,
          username: res.username,
          password: "",
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchSetting();
  }, []);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const res = await updateProfile(
        value.name,
        value.username,
        value.email,
        value.password
      );
      console.log(res);

      if (res) {
        Swal.fire({
          text: "profil berhasil diperbarui",
          icon: "success",
          confirmButtonText: "oke",
          confirmButtonColor: "#2BA54B",
          buttonsStyling: true,
          customClass: {
            confirmButton: "primary-button",
          },
        });
      }
    } catch (error: any) {
      Swal.fire({
        text: error.response.data.message,
        icon: "error",
        confirmButtonText: "oke",
        confirmButtonColor: "#DB3726",
        buttonsStyling: true,
        customClass: {
          confirmButton: "danger-button",
        },
      });
    } finally {
      setEdit({
        Email: false,
        Name: false,
        Password: false,
        Username: false,
      });
    }
  };
  return {edit, setEdit, value, handleOnChange, handleSubmit, previewPassword, setPreviewPassword};
};
