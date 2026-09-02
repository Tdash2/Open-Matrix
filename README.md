# Open Matrix
This repo is a tool for turning an biamp dsp into a production intercom matrix. This software make a web based user interface that lets you build partylines and manage cross points directly. 

Due to the biamp DSP command processing time it makes using open matrix as a full fledged intercom line and RTS matrix impossible. When testing it can take up to 10 seconds to fully establish a partyline after adding a talker or listener on a big matrix. Open matrix is designed to replace a Studio Technologies Model 5422A. The Studio Technologies Model 5422A uses a separate channel for each key on the intercom panel. This makes is so you don't have to do re route signals inside the matrix every time a user wants to talk or listen. 

I have made 2 premade DSP files. One for a Biamp Tesira Server IO with a 1x DAN-1 Card, 1x SVC-2, 1x SOC-4, 1x SEC-4 and 3x DSP-2. This give you a total of 6 IFB, 64x64 dante, 2x2 voip and 4x4 analog. More can be added to this file. There is a lot more you can add but this is a good starting point. To add more input or outputs just change the size of the matrix mixer then copy the comp gate block on the output. The file for the Biamp TesiraFORTÉ DAN VT has a total of 4 IFB, 32x32 dante, 2x2 voip and 12x8 analog. This file used 94% of the DSP and 100% of the IO so there is not much more you can add. 


To Setup open matrix first install program the dsp with one of the given files. Then note the IP of the DSP. After that download the program. Extract the zip then select your OS. You then need to edit the appsettings.json and find ""Host": "10.168.0.194"" and change the ip to your DSP ip. You can then run the program. It will appear as a console window. After it connects to the dsp it will give you a web address to access the server.

The web interface is broken into 3 sections. Names, Crosspoints and Partylines. Most of the work will be done in the Partylines tab.
To name an input or output go to the names section and edit the name. The name will auto save.
To make a partyline go to the partylines tab then under add new partyline enter the name then click create. 
After you have a partyline you can select the party line you want to edit by using the dropdown. After that you can simply click the checkboxes by each port to add or remove that port. Changes are automatically applied. 
