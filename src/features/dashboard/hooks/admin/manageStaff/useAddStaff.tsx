import Swal from "sweetalert2";
import { createStaff, editStaff } from "../../../services/admin/ManageStaff";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const useAddStaff = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [showingPassword, setShowingPassword] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [editPreviewImage, setEditPreviewImage] = useState<string | null>(null);
  const [form, setForm] = useState({
    profile_picture_file: null as File | null,
    name: "",
    email: "",
    username: "",
    password: "",
    role: "",
    division: "",
  });
  const [dataEdit, setDataEdit] = useState({
    id: 0,
    profile_picture_file: null as File | null,
    name: "",
    email: "",
    username: "",
    password: "",
    role: "",
    division: "",
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (location.pathname === "/admin/manage-staff/edit") {
      if (name === "profile_picture_file" && files) {
        setDataEdit((prev) => ({
          ...prev,
          profile_picture_file: files[0],
        }));
        setEditPreviewImage(URL.createObjectURL(files[0]));
      } else {
        setDataEdit((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
    } else {
      if (name === "profile_picture_file" && files) {
        setForm((prev) => ({
          ...prev,
          profile_picture_file: files[0],
        }));
        setPreviewImage(URL.createObjectURL(files[0]));
      } else {
        setForm((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
    }
  };

  const handleCreate = async () => {
    setIsLoading(true);
    try {
      await createStaff(
        form.profile_picture_file,
        form.name,
        form.email,
        form.username,
        form.password,
        form.role,
        form.division
      );
      Swal.fire({
        text: "Staff berhasil dibuat",
        icon: "success",
        confirmButtonText: "oke",
        confirmButtonColor: "#2BA54B",
        buttonsStyling: true,
        customClass: {
          confirmButton: "primary-button",
        },
      }).then((response) => {
        if (response.isConfirmed) {
          navigate("/admin/manage-staff");
        }
      });
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
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (location.pathname === "/admin/manage-staff/edit") {
      const userData = location.state.userData;
      console.log(userData);

      setDataEdit({
        id: userData.id,
        profile_picture_file: null,
        division: userData.division,
        email: userData.email,
        name: userData.name,
        password: dataEdit.password,
        role: userData.role,
        username: userData.username,
      });
      setEditPreviewImage(userData.profile_picture_url);
    }
  }, [location.state]);

  const handleEdit = async () => {
    setIsLoading(true);
    try {
      await editStaff(
        dataEdit.id,
        dataEdit.profile_picture_file ?? null,
        dataEdit.name,
        dataEdit.email,
        dataEdit.username,
        dataEdit.password,
        dataEdit.role,
        dataEdit.division
      );

      Swal.fire({
        text: "Staff berhasil diedit",
        icon: "success",
        confirmButtonText: "oke",
        confirmButtonColor: "#2BA54B",
        buttonsStyling: true,
        customClass: {
          confirmButton: "primary-button",
        },
      }).then((response) => {
        if (response.isConfirmed) {
          navigate("/admin/manage-staff");
        }
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return {form, previewImage, dataEdit, editPreviewImage, isLoading, showingPassword, handleOnChange, handleCreate, handleEdit, setShowingPassword, navigate};
};
