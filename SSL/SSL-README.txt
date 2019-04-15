In order to deploy the SSL on the Tomcat Server follow these steps:
1) download the "VladsCertificate.crt" and save it to some directory. Remember its path.
2) Copy Lines 55 -64 in given server.xml into your server.xml of your Tomcat. Make sure to put them between the uncommented <Connector> tags.

In the tag, indicate the path to the path to the certificate in similar fashion as in the example(maintaining the forward slashes for Windows)
3) Copy the lines 8-16 given web.xml into the web.xml of your Project. Make sure the put tehm within the <web-app> tag.

You should be good to go. Don't worry if the browser will complain that the connection is not secure. The SSL encryption is still there. 