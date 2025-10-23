#!/usr/bin/env python3

import rclpy
from rclpy.node import Node
from sensor_msgs.msg import Image, CameraInfo
from cv_bridge import CvBridge
import cv2

class WebcamPublisher(Node):
    def __init__(self):
        super().__init__('webcam_publisher')

        # Publishers
        self.image_pub = self.create_publisher(Image, '/camera/image_raw', 10)
        self.info_pub = self.create_publisher(CameraInfo, '/camera/camera_info', 10)

        self.bridge = CvBridge()

        # Mở webcam
        self.cap = cv2.VideoCapture(0)
        self.cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
        self.cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

        if not self.cap.isOpened():
            self.get_logger().error("❌ Không thể mở webcam.")
            return

        self.get_logger().info("✅ Webcam đã mở. Đang phát /camera/image_raw và /camera/camera_info")

        # Gửi dữ liệu định kỳ
        self.timer = self.create_timer(1.0 / 30.0, self.publish_frame)  # 30 FPS

    def publish_frame(self):
        ret, frame = self.cap.read()
        if not ret:
            self.get_logger().warning("⚠️ Không đọc được frame.")
            return

        # Tạo Image message
        img_msg = self.bridge.cv2_to_imgmsg(frame, encoding='bgr8')
        img_msg.header.stamp = self.get_clock().now().to_msg()
        img_msg.header.frame_id = "camera_link"

        # Tạo CameraInfo giả (dùng K và P đơn giản)
        cam_info = CameraInfo()
        cam_info.header = img_msg.header
        cam_info.width = frame.shape[1]
        cam_info.height = frame.shape[0]
        fx = fy = 500.0
        cx = frame.shape[1] / 2
        cy = frame.shape[0] / 2
        cam_info.k = [fx, 0, cx, 0, fy, cy, 0, 0, 1]
        cam_info.p = [fx, 0, cx, 0, 0, fy, cy, 0, 0, 0, 1, 0]

        # Publish cả hai
        self.image_pub.publish(img_msg)
        self.info_pub.publish(cam_info)

    def destroy_node(self):
        self.cap.release()
        cv2.destroyAllWindows()
        super().destroy_node()

def main(args=None):
    rclpy.init(args=args)
    node = WebcamPublisher()
    try:
        rclpy.spin(node)
    except KeyboardInterrupt:
        pass
    node.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
