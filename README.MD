# NCD Assignment 
Calculate the best location of a link station that provides the highest access power for a device at certain location.

# Solution 
To calculate the best link station: 

1. Calculate the distance between device and available link stations. As the location is given in two-dimensional/xy coordinates, the distance is calculated based on Pythagoras Theorm. The result is an absolute distance value that represents how far the device from each of the link stations.  
2. Each link station has reach and power. Power is calculated by comparing distance and reach. If reach is higher than distance, the power equals to the square value of reach minus distance. Otherwise, power equals to zero, since reach is smaller than distance from device to link station.
3. After comparing power from each link station to device, the link station that provides the highest power based on distance to the device is selected as the best link station. The output then is printed to console. 

# Running the application 
1. Install dependencies used in this application via  ```$ npm install ```
2. The case studies for each device and link station locations are written on src/index.ts
2. Run the application via command line interface ```$ npm run start```
3. It shall print some information on the console

# Others 
* To run TypeScript linting ```$ npm run lint```
* To run test ```$ npm run test ```


