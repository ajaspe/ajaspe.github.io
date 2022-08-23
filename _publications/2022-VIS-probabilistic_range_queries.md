---
layout: publication
code: 2022-VIS-probabilistic_range_queries
title: "Multivariate Probabilistic Range Queries for Scalable Interactive 3D Visualization"
authors: Amani Ageeli, Alberto Jaspe-Villanueva, Ronell Sicat, Florian Mannuss, Peter Rautek, and Markus Hadwiger
year: 2022
type: Journal Paper
conference: IEEE VIS 2022
journal: "IEEE Transactions on Visualization and Computer Graphics"
pub-data: "(to appear)"
abstract: "Large-scale scientific data, such as weather and climate simulations, often comprise a large number of attributes for each data sample, like temperature, pressure, humidity, and many more. Interactive visualization and analysis require filtering according to any desired combination of attributes, in particular logical AND operations, which is challenging for large data and many attributes. Many general data structures for this problem are built for and scale with a fixed number of attributes, and scalability of joint queries with arbitrary attribute subsets remains a significant problem. We propose a flexible probabilistic framework for multivariate range queries that decouples all attribute dimensions via projection, allowing any subset of attributes to be queried with full efficiency. Moreover, our approach is output-sensitive, mainly scaling with the cardinality of the query result rather than with the input data size. This is particularly important for joint attribute queries, where the query output is usually much smaller than the whole data set. Additionally, our approach can split query evaluation between user interaction and rendering, achieving much better scalability for interactive visualization than the previous state of the art. Furthermore, even when a multi-resolution strategy is used for visualization, queries are jointly evaluated at the finest data granularity, because our framework does not limit query accuracy to a fixed spatial subdivision."
projects: 
 - Massive data
#doi: 10.1007/s00371-021-02172-9
lab_website: https://vccvisualization.org/research/highdimfiltering/
#youtube: SybNmo98DD4

bibtex: "@Article{Ageeli:2022:PRQ},\n
  title = {Multivariate Probabilistic Range Queries for Scalable Interactive 3D Visualization},\n
  author = {Ageeli, Amani and {Jaspe Villanueva}, Alberto and Sicat, Ronell and Mannuss, Florian and Rautek, Peter and Hadwiger, Markus},\n
  journal = {IEEE Transactions on Visualization and Computer Graphics (Proceedings IEEE VIS 2022)},\n
  year = {2023},\n
  volume = {29},\n
  number = {1},\n
  pages = {to appear},\n
  url = {https://vccvisualization.org/research/highdimfiltering/}\n
}"

---