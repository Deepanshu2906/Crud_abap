sap.ui.define([

    "sap/ui/core/mvc/Controller",

    "sap/m/MessageBox"

],

    /**

     * @param {typeof sap.ui.core.mvc.Controller} Controller

     */

    function (Controller, MessageBox) {

        "use strict";

 

        return Controller.extend("training1.controller.View1", {

            onInit: function () {

 

            }

            ,onNext: function(oEvent){

                var oItem = oEvent.getSource();

                var oRouter = this.getOwnerComponent().getRouter();

                oRouter.navTo("RouteView2")

            },

 

            onClick:function(){

               

            },

            createData: function(){

                var ID = this.getView().byId("idinput").getValue();

                var Name = this.getView().byId("nameinput").getValue();

                var class1 = this.getView().byId("deptinput").getValue();

                var data = {

                    Ebeln: ID,

                    Waers: Name,

                    Maktx: class1

                };

                var odataModel = this.getView().getModel();

                console.log(data, odataModel);

                odataModel.create("/ZBTP_TEST_DATA", data, {

                    success: function(data, response){

                        MessageBox.success("Data successfully created");

                        odataModel.refresh();

                    },

                    error: function(error){

                        MessageBox.error("Error while creating the data");

                    }

                });

            },

            updateData: function(){

                var table1 = this.getView().byId("_IDGenTable1");

                var selItem = table1.getSelectedItem();

                var title = selItem.getTitle();

                var description = selItem.getDescription();

                var Name = this.getView().byId("nameinput").getValue();

                var payload = {

                    ID: parseInt(title),

                    Name: Name

                };

 

                var path = "/Categories(" + title + ")";

                var odataModel = this.getView().getModel();

                // @ts-ignore

                odataModel.update(path,payload,{

                    success: function(data,response){

                        MessageBox.success("Successfully Updated");

                    },

                    error: function(error){

                        MessageBox.error("Error while updating the data");

                    }

                });

            },

            selectedEmpItem:function(oEvent){

                // var list= oEvent.getParameters('listitem')

                // console.log(list);

                var oTable = oEvent.getSource();

 

              var aSelectedItem = oTable.getSelectedItem();

              console.log(aSelectedItem);

 

             

 

              aSelectedTravelIds = aSelectedItem.map(function(oSelectedItem) {

 

                  return oSelectedItem.getBindingContext().getProperty("EmpId")

 

              });

 

             console.log(aSelectedTravelIds);

 

              // console.log("Selected Travel IDs: " + aSelectedTravelIds.join(","));

 

            //   return aSelectedTravelIds;

            }

        });

    });