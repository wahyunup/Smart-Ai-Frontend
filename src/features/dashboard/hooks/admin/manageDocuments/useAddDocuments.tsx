import Swal from "sweetalert2";
import {
  editDocument,
  uploadDocuments,
} from "../../../services/admin/ManageDocuments";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const useAddDocuments = () => {
  const [form, setForm] = useState({
    file: null as File | null,
    name: "",
    tag: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [dataEdit, setDataEdit] = useState({
    id: 0,
    title: "",
    extracted_text: "",
    tags: [] as string[],
  });

  useEffect(() => {
    const datas = location.state?.datas;
    console.log(datas);

    if (datas) {
      const tags = datas.tags.map((tag: []) => tag);
      setDataEdit({
        id: datas.id,
        extracted_text: datas.extracted_text,
        tags: tags,
        title: datas.title,
      });
    }
  }, [location.state]);

  const handleSubmit = async () => {
    if (!form.file || !form.name || !form.tag) {
      Swal.fire({
        text: "semua field wajib diisi!",
        icon: "warning",
        confirmButtonText: "oke",
        confirmButtonColor: "#2BA54B",
        buttonsStyling: true,
        customClass: {
          confirmButton: "primary-button",
        },
      }).then((response) => {
        if (response.isConfirmed) {
          return;
        }
      });
    }
    setIsLoading(true);

    try {
      if (!form.file) {
        Swal.fire({
          text: "semua field wajib diisi!",
          icon: "warning",
          confirmButtonText: "oke",
          confirmButtonColor: "#2BA54B",
          buttonsStyling: true,
          customClass: {
            confirmButton: "primary-button",
          },
        });
        return;
      }
      await uploadDocuments(form.file, form.name, form.tag);
      Swal.fire({
        text: "upload dokument berhasil",
        icon: "success",
        confirmButtonText: "oke",
        confirmButtonColor: "#2BA54B",
        buttonsStyling: true,
        customClass: {
          confirmButton: "primary-button",
        },
      }).then((response) => {
        if (response.isConfirmed) {
          navigate("/admin/manage-documents");
        }
      });
    } catch (error: any) {
      Swal.fire({
        text: error.response.data.message,
        icon: "warning",
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

  const handleEdit = async () => {
    if (!dataEdit.extracted_text || !dataEdit.title || !dataEdit.tags) {
      Swal.fire({
        text: "Semua field wajib diisi!",
        icon: "warning",
        confirmButtonText: "oke",
        confirmButtonColor: "#2BA54B",
        buttonsStyling: true,
        customClass: {
          confirmButton: "primary-button",
        },
      }).then((response) => {
        if (response.isConfirmed) {
          return;
        }
      });
    }
    setIsLoading(true);
    try {
      await editDocument(
        dataEdit.id,
        dataEdit.extracted_text,
        dataEdit.title,
        dataEdit.tags
      );
      Swal.fire({
        text: "edit dokument berhasil",
        icon: "success",
        confirmButtonText: "oke",
        confirmButtonColor: "#2BA54B",
        buttonsStyling: true,
        customClass: {
          confirmButton: "primary-button",
        },
      }).then((response) => {
        if (response.isConfirmed) {
          navigate("/admin/manage-documents");
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

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (location.pathname === "/admin/manage-documents/edit") {
      if (name === "tags") {
        setDataEdit((prev) => ({
          ...prev,
          tags: value.split(",").map((t) => t.trim()),
        }));
      } else {
        setDataEdit((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
    } else {
      if (name === "file" && files) {
        setForm((prev) => ({
          ...prev,
          file: files[0],
        }));
      } else {
        setForm((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
    }
  };
  return {
    dataEdit,
    handleOnChange,
    handleSubmit,
    handleEdit,
    isLoading,
    setIsLoading,
    setDataEdit,
    form,
    navigate,
  };
};
