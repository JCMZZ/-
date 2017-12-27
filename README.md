# websocket
Implement long polling
Using websocket to implement a simple heartbeat service, the server side is a websocket server built with nodejs.
When a client sends a ws request to the server, the connection is implemented.

How to test the current project:
  Only Windows operating systems are available:
  一： Copies all static files to the current project directory；
  二： Open the command line window in the current project directory：node -v.Check to see if you have a node environment.
       If there is no node environment, please install the configuration according to node website.
  三： To ensure that the command line is under the current project root directory, perform installation dependencies and input commands:          cnpm install
  四： After the installation is successful, start the node service and the websocket service.Double-click the.bat file to start the              service.
  五： Address bar input:http://127.0.0.1:8181/.
