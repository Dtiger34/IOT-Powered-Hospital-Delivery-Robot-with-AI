### Build and create package

```
mkdir -p ~/robot_ws/src
cd ~/robot_ws/
colcon build
```

### Create a package

```
cd ~/robot_ws/src
ros2 pkg create name_of_package --build-type ament_cmake --dependencies std_msgs sensor_msgs
