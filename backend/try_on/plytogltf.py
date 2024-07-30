import aspose.threed as a3d

scene = a3d.Scene.from_file("3d.ply")
scene.save("Output.gltf")