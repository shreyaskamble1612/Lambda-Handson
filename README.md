Image Processing With AWS Lambda
1. Login to the AWS console
2. Open S3 service and Create two S3 Bucket one as a Source Bucket and second as a Destination Bucket give name according to you
3. Open the services and Open IAM service which is Identity and Access Management service
4. Create a Role, which is an identity having a specific permissions.
5.Choose Use case means any service, We have to choose lambda Choose policies for the role and give any name to the role || Choose the policies AmazonS3FullAccess,AWSLambda_FullAccess,AWSLambdaBasicExecutionRole
6.Save the Role
7.Go to the services,Choose Lambda
8. Tap to Create function
9. Choose create from scratch
10. Give any name to the function
11. Choose Runtime accrding to the language used in an application
12. choose architecture there are two options x86_64 and arm64.
13. Choose x86_64, Basically these are the instruction set architecture of the processor
14. x86_64 is used in personal laptops,pc where arm64 is used in mobile devices and embeded system
15. Tap on Change Default Execution Role
16. Choose a role that you have created
17. Keep all the advanced settings as default
18. Tap on create function
19. You will reach to your kambda function
20. Now you have to change the code acording to your application
21. Go to the github repository link  bit.ly/161218 and clone that repository
22. Open thess files into the vs code
23. You can see the javascript code there for fetching the image from source bucket ,resize it and again restore it in destination ucket
24. Again go to the AWS console and check the region in the right top corner .Change the region in your coode as well as change the name of  destination bucket with the name of the bucket that you have created as a destination bucket
26. 25. Go to the nodejs folder and install node_modules with command 'npm install'
27. Open the node js folder in folder location where it is located.
28. Make a zip file of that folder
29. Copy whole javascript code in index.mjs and paste it in the lambda
30. Click the deploy button
31. In the same page go to the onfiguration anf choose General configuration Where edit the timeout to 2-3 minutes. Basically this is the maximum execution time of your function
32. Go to the layers on the same page. Open the left sidebar and go for layers
33. Tap on the add layers
34. give name to the layer
35. Upload the zip file of nodejs, make sure that name of the zip file must be 'nodejs'
36. Below that choose runtime , as your code is in javascript choose nodejs as as runtime
37. then choose architecture x86_64
38. then tap on create layer
39. Go to the page where you have created lambda fuction
40. Tsp on the Layers, it will redirest you to tha 'add layers' then Choose custom layer and choose the layer that you have created
41. Now go to the lambda function that you have created
42. Tap on the Add trigger ,Choose trigger source choose s3 and choose the bucket that you have created as a source bucket. because we want to execute our function whenever any event occurs
43. Now go to the s3 service where we can Upload the image in s3 bucket that created as a source Refresh the page and open the bucket that you have created  as a destination bucket you can see the resized image
44. Download the image and changevpassword
