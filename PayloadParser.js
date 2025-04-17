function parseUplink(device, payload)
{
    // Obtener payload como JSON
    const jsonPayload = payload.asJsonObject();
    Object.keys(jsonPayload).forEach(function(key){
        env.log(key,jsonPayload[key])
    })

    // No se puede deserializar el payload como json, salir.
    if (!jsonPayload) { return; }

    // Verificar que la dirección del dispositivo sea la correcta
    //if (jsonPayload.deviceAddress.toString() !== device.address.toString()) {
      //  env.log('Invalid device address');}
       // return;
    

       

    // Parsear MQTT WEBHOOK
    
    if (jsonPayload.sensorMessages) { 
        var temperatureSensor1 = device.endpoints.byAddress(1);
        var temperatureSensor2 = device.endpoints.byAddress(2);
        var temperatureSensor3 = device.endpoints.byAddress(3);

        const data = jsonPayload.sensorMessages; // descomentar para que vuelva a estar Online los sensores
                for (let i = 0; i < data.length; i++) {
                    const item = data[i];
                    var devID1 = "753652";  // Empaque 2
                    var devID2 = "753651";  // Camara de Frio Materias Primas
                    var devID3 = "751308";  // Camara de Frio C1
                    var sensorID = item.sensorID.toString();
                    env.log("Device ID  --->",devID1);
                    env.log("Sensor NAME --> ",item.sensorName);
                    env.log("Sensor ID --> ",sensorID);
                    env.log("FECHA --> ",item.messageDate);
                    env.log("TEMP --> ",item.dataValue);
                    
                    if (devID1 == sensorID){
                        temperatureSensor1.updateTemperatureSensorStatus(item.dataValue);
                        device.updateDeviceBattery({voltage : item.voltage});
                        device.updateDeviceRssi({strength:item.signalStrength});
                        env.log("Valor actualizado --->",item.dataValue, item.messageDate, " Sensor--> ",sensorID);                       
                    }
                    else 
                        env.log ("NO OK  ", devID1);

                    if (devID2 == sensorID){
                        temperatureSensor2.updateTemperatureSensorStatus(item.dataValue);
                        device.updateDeviceBattery({voltage : item.voltage});
                        device.updateDeviceRssi({strength:item.signalStrength});
                        env.log("Valor actualizado --->",item.dataValue, item.messageDate, " Sensor--> ",sensorID);                       
                    }
                    else 
                        env.log ("NO OK  ", devID2);


                    if (devID3 == sensorID){
                        temperatureSensor3.updateTemperatureSensorStatus(item.dataValue);
                        device.updateDeviceBattery({voltage : item.voltage});
                        device.updateDeviceRssi({strength:item.signalStrength});
                        env.log("Valor actualizado --->",item.dataValue, item.messageDate, " Sensor--> ",sensorID);                       
                    }
                    else 
                        env.log ("NO OK  ", devID3);        
                    }
        
    }

    


}