---
layout: project
title:  "Python AR.Drone"
date:   2014-01-17 17:59:32
author: Bastian Venthur
categories:
- project
img: ardrone_01.jpg
thumb: ardrone-thumb01.jpg
carousel:
- ardrone_01.jpg
- ardrone_02.jpg
- ardrone_03.jpg

website: https://github.com/SZanlongo/python-ardrone
---
####Python AR.Drone
Fork of Python AR.Drone. Added demo showing camera navigation. Uses Canny Edge Detection and Hough Transform to find edges in a hallway. Then takes the vanishing point indicated by the region with the highest number of intersecting lines and attempts to navigate towards that location.