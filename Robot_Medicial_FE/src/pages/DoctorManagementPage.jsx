import React, { useState, useEffect } from "react";
import DoctorProfileProvisionForm from "./DoctorProfileProvisionForm";

export default function DoctorManagementPage() {
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(false);

    // Giả lập API load danh sách bác sĩ
    useEffect(() => {
        async function fetchDoctors() {
            setLoading(true);

            const data = [
                {
                    id: 1,
                    fullName: "BS. Nguyễn Văn A",
                    email: "nguyenvana@example.com",
                    clinicHospital: "Bệnh viện Bạch Mai",
                    specialties: ["Nội khoa"],
                    isActive: true,
                    username: "bsnguyenvana",
                },
                {
                    id: 2,
                    fullName: "BS. Trần Thị B",
                    email: "tranthib@example.com",
                    clinicHospital: "Bệnh viện 108",
                    specialties: ["Da liễu"],
                    isActive: false,
                    username: "bstranthib",
                },
            ];
            setTimeout(() => {
                setDoctors(data);
                setLoading(false);
            }, 50);
        }
        fetchDoctors();
    }, []);

    // Handler mở form thêm mới
    const handleAddDoctor = () => {
        setSelectedDoctor(null);
        setShowForm(true);
    };

    // Handler chỉnh sửa bác sĩ
    const handleEditDoctor = (doctor) => {
        setSelectedDoctor(doctor);
        setShowForm(true);
    };

    // Handler lưu bác sĩ (thêm mới hoặc cập nhật)
    const handleSaveDoctor = async (doctorData) => {
        if (selectedDoctor) {
            // update
            setDoctors((prev) =>
                prev.map((d) =>
                    d.id === selectedDoctor.id ? { ...d, ...doctorData } : d
                )
            );
        } else {
            // add new
            const newDoctor = {
                id: doctors.length + 1,
                ...doctorData,
            };
            setDoctors((prev) => [...prev, newDoctor]);
        }
        setShowForm(false);
    };

    // Handler hủy bỏ form
    const handleCancelForm = () => {
        setShowForm(false);
    };

    if (showForm) {
        return (
            <div className="container py-4">
                <button
                    className="btn btn-outline-secondary mb-3"
                    onClick={handleCancelForm}
                >
                    ← Quay lại danh sách
                </button>
                <DoctorProfileProvisionForm
                    initialData={selectedDoctor || {}}
                    onCancel={handleCancelForm}
                    onSave={handleSaveDoctor}
                />
            </div>
        );
    }

    return (
        <div className="container py-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold">Quản lý bác sĩ</h2>
                <button className="btn btn-primary" onClick={handleAddDoctor}>
                    + Thêm mới bác sĩ
                </button>
            </div>

            {loading ? (
                <div className="text-center py-4">Đang tải danh sách...</div>
            ) : doctors.length === 0 ? (
                <div className="text-center py-4 text-muted">Chưa có bác sĩ nào</div>
            ) : (
                <div className="table-responsive">
                    <table className="table table-hover align-middle">
                        <thead className="table-light">
                            <tr>
                                <th>#</th>
                                <th>Tên bác sĩ</th>
                                <th>Email</th>
                                <th>Bệnh viện</th>
                                <th>Chuyên khoa</th>
                                <th>Trạng thái</th>
                                <th>Tài khoản</th>
                                <th className="text-center">Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {doctors.map((doctor, idx) => (
                                <tr key={doctor.id}>
                                    <td>{idx + 1}</td>
                                    <td>{doctor.fullName}</td>
                                    <td>{doctor.email}</td>
                                    <td>{doctor.clinicHospital}</td>
                                    <td>{doctor.specialties.join(", ")}</td>
                                    <td>
                                        <span
                                            className={`badge ${doctor.isActive ? "bg-success" : "bg-secondary"
                                                }`}
                                        >
                                            {doctor.isActive ? "Hoạt động" : "Tạm ngưng"}
                                        </span>
                                    </td>
                                    <td>{doctor.username}</td>
                                    <td className="text-center">
                                        <button
                                            className="btn btn-sm btn-outline-primary me-2"
                                            onClick={() => handleEditDoctor(doctor)}
                                        >
                                            ✏️ Sửa
                                        </button>
                                        <button
                                            className="btn btn-sm btn-outline-danger"
                                            onClick={() =>
                                                setDoctors(doctors.filter((d) => d.id !== doctor.id))
                                            }
                                        >
                                            🗑️ Khóa
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
