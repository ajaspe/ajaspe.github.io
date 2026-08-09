---
layout: publication
code: 2026-Web3D-PanoGS
title: "PanoGS: Foundation-Depth-Guided High-Resolution Gaussian Splatting from Sparse Panoramic Images for Interactive Web3D Exploration"
authors: Uzair Shah, Giovanni Pintore, Alberto Jaspe-Villanueva, Muhammad Tukur, Wala Elsharif, Mahmood Alzubaidi, Enrico Gobbetti, Marco Agus
year: 2026
type: Conference Paper
conference: Web3D 2026 - 28th International ACM Conference on 3D Web Technology
pub-data: "To appear"
abstract: "Sparse panoramic capture enables efficient indoor digitization, but transforming a few 360° images into web-based, high-resolution 3D representations remains difficult. Limited viewpoint overlap, equirectangular (ERP) distortions, uncertain depth scale, and the perspective-camera assumptions of most image-to-3D pipelines make direct reconstruction unreliable. This paper introduces PanoGS, a pipeline that uses inferred depth from vision foundation models to guide the generation of high-resolution 3D Gaussian Splatting scenes from sparse panoramic images. Given a small set of RGB panoramas, we first estimate camera poses and low-resolution depth priors using a feed-forward panoramic reconstruction model. We then refine these priors at native ERP resolution through global-local depth refinement and fuse the resulting RGB-D panoramas into a Truncated Signed Distance Function (TSDF) geometric substrate, which provides stable surface support, normals, visibility information, and local scale estimates for initializing anisotropic Gaussian primitives. The initialized scene is further refined using an ERP-aware Gaussian optimization strategy with progressive levels of detail, appearance warm-start, conservative geometry updates, neighbor-based multiview refinement, and shardwise processing for large scenes. The resulting assets can be exported to Gaussian splat viewers and browser-based inspection tools. Results on indoor panoramic scenes demonstrate that the proposed guided formulation produces more stable and complete Gaussian scenes than direct depth-based seeding. At the same time, high-resolution depth refinement improves fine geometric and visual detail. PanoGS shows how sparse 360° captures can be transformed into practical web-based Gaussian representations for Web3D applications."
projects: 
 - Gaussian Splatting
 - Indoor Modeling
doi: 10.1145/3563045.3563055
bibtex: "@inproceedings{Shah:2026:PanoGS},\n
  title = {PanoGS: Foundation-Depth-Guided High-Resolution Gaussian Splatting from Sparse Panoramic Images for Interactive Web3D Exploration},\n
  author = {Shah, Uzair and Pintore, Giovanni and Jaspe-Villanueva, Alberto and Tukur, Muhammad and Elsharif, Wala and Alzubaidi, Mahmood and Gobbetti, Enrico and Agus, Marco},\n
  booktitle = {Proc. Web3D 2026 - 28th International ACM Conference on 3D Web Technology},\n
  month = {October},\n
  year = {2026},\n
  doi = {10.1145/3563045.3563055}\n
}"

---
