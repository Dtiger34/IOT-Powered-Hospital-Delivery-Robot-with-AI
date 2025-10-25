// DashboardRobot.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function DashboardRobot() {
    const navigate = useNavigate();

    const stats = [
        { title: "Tổng số robot", value: 4, color: "primary" },
        { title: "Đang vận chuyển", value: 0, color: "success" },
        { title: "Chờ bàn giao", value: 2, color: "warning" },
        { title: "Tại trạm khử khuẩn", value: 1, color: "info" },
        { title: "Cần hỗ trợ", value: 0, color: "danger" },
        { title: "Sẵn sàng", value: 1 },
    ];

    const tasks = [
        { id: "RB-001", destination: "Khoa Dược", progress: 50, status: "Chờ bàn giao" },
        { id: "RB-002", destination: "Phòng Cấp Cứu", progress: 50, status: "Chờ bàn giao" },
    ];

    const handleViewDetail = (taskId) => {
        navigate(`/robot-tasks/${taskId}`);
    };

    const handleAddTask = () => {
        navigate(`/addtasks`);
    };

    return (
        <div
            className="min-vh-100 py-4"
            style={{
                background: "linear-gradient(90deg, #8bf0e4ff 10%, #FFFFFF 100%)",
                color: "#212529"
            }}
        >
            <div className="container-fluid">
                <h4 className="fw-bold mb-3">Trạng Thái Hiện Tại</h4>
                <div className="row g-3">
                    {stats.map((s, i) => (
                        <div className="col-md-2" key={i}>
                            <div
                                className="card shadow-sm border-0 h-100"
                                style={{ borderRadius: "10px", backgroundColor: "#ffffff" }}
                            >
                                <div className="card-body text-center">
                                    <div className={`fs-3 mb-2 text-${s.color}`}>{s.icon}</div>
                                    <div className="fw-semibold">{s.title}</div>
                                    <div className="fs-4 fw-bold mt-1 text-dark">{s.value}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <h4 className="fw-bold mt-5 mb-3">Thống Kê Hiệu Suất</h4>
                <div className="row g-3">
                    <div className="col-md-4">
                        <div className="card shadow-sm border-0 p-3">
                            <div className="d-flex align-items-center">
                                <div className="fs-4 me-3 text-success">📊</div>
                                <div>
                                    <div className="fw-semibold">Nhiệm vụ hoàn thành</div>
                                    <div className="fs-4 fw-bold">0</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card shadow-sm border-0 p-3">
                            <div className="d-flex align-items-center">
                                <div className="fs-4 me-3 text-danger">🚨</div>
                                <div>
                                    <div className="fw-semibold">Lỗi phát sinh</div>
                                    <div className="fs-4 fw-bold">0</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card shadow-sm border-0 p-3">
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center">
                                    <div className="fs-4 me-3 text-primary">⏱️</div>
                                    <div>
                                        <div className="fw-semibold">TG vận chuyển TB</div>
                                        <div className="fs-4 fw-bold">N/A</div>
                                    </div>
                                </div>
                                <div>
                                    <button className="btn btn-outline-primary btn-sm me-1">
                                        Hôm nay
                                    </button>
                                    <button className="btn btn-outline-primary btn-sm me-1">
                                        Tháng này
                                    </button>
                                    <button className="btn btn-outline-primary btn-sm">
                                        Năm nay
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row mt-5">
                    <div className="col-md-6">
                        <div className="card shadow-sm border-0 p-3">
                            <h5 className="fw-bold mb-3">Tổng Quan Trạng Thái</h5>
                            <div className="mb-3">
                                <small className="fw-semibold">Chờ bàn giao (2/4)</small>
                                <div className="progress mt-1" style={{ height: "8px" }}>
                                    <div className="progress-bar bg-warning" style={{ width: "50%" }}></div>
                                </div>
                            </div>
                            <div className="mb-3">
                                <small className="fw-semibold">Tại trạm (1/4)</small>
                                <div className="progress mt-1" style={{ height: "8px" }}>
                                    <div className="progress-bar bg-info" style={{ width: "25%" }}></div>
                                </div>
                            </div>
                            <div className="mb-3">
                                <small className="fw-semibold">Sẵn sàng (4/4)</small>
                                <div className="progress mt-1" style={{ height: "8px" }}>
                                    <div className="progress-bar bg-secondary" style={{ width: "25%" }}></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="card shadow-sm border-0 p-3">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h5 className="fw-bold mb-0" >Tiến Trình Nhiệm Vụ</h5>
                                <button className="btn btn-primary btn-sm" onClick={() => handleAddTask()}>+ Thêm Nhiệm Vụ</button>

                            </div>
                            <table className="table table-striped align-middle mb-0">
                                <thead>
                                    <tr className="table-primary">
                                        <th>Robot</th>
                                        <th>Đích đến</th>
                                        <th>Tiến độ</th>
                                        <th>Trạng thái</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tasks.map((t, i) => (
                                        <tr key={i}>
                                            <td>{t.id}</td>
                                            <td>{t.destination}</td>
                                            <td>
                                                <div className="progress" style={{ height: "6px" }}>
                                                    <div
                                                        className="progress-bar bg-warning"
                                                        style={{ width: `${t.progress}%` }}
                                                    ></div>
                                                </div>
                                                <small>{t.progress}%</small>
                                            </td>
                                            <td>
                                                <span className="badge bg-warning text-dark">{t.status}</span>
                                            </td>
                                            <td>
                                                <button
                                                    className="btn btn-outline-primary btn-sm"
                                                    onClick={() => handleViewDetail(t.id)}
                                                >
                                                    Theo dõi
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
