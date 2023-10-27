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

            , onNext: function (oEvent) {

                var oItem = oEvent.getSource();

                var oRouter = this.getOwnerComponent().getRouter();

                oRouter.navTo("RouteView2")

            },



            onClick: function () {



            },

            createData: function () {

                var ID = this.getView().byId("idinput").getValue();

                var Name = this.getView().byId("nameinput").getValue();

                var materialName = this.getView().byId("deptinput").getValue();
                var   date1String = this.getView().byId("id_date").getValue();
                
                var data = {

                    Ebeln: ID,

                    Waers: Name,

                    Maktx: materialName,
                    // Aedat: date1String

                };

                var odataModel = this.getView().getModel();

                console.log(data);

                odataModel.create("/ZBTP_TEST_DATA", data, {

                    success: function (data, response) {

                        MessageBox.success("Data successfully created");

                        odataModel.refresh();

                    },

                    error: function (error) {

                        MessageBox.error("Error while creating the data");

                    }

                });

            },
           
           formatDateToCustomFormat:function(date) {
                const months = [
                    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
                ];
            
                const day = date.getDate();
                const month = months[date.getMonth()];
                const year = date.getFullYear();
                const hours = date.getHours();
                const minutes = date.getMinutes();
                const seconds = date.getSeconds();
                const timezoneOffset = date.getTimezoneOffset();
                const timezoneHours = Math.floor(Math.abs(timezoneOffset) / 60);
                const timezoneMinutes = Math.abs(timezoneOffset) % 60;
                const timezoneSign = timezoneOffset < 0 ? '+' : '-';
            
                const timezoneString = `GMT${timezoneSign}${timezoneHours}:${timezoneMinutes}`;
                
                const formattedDate = `${day} ${month} ${year} ${hours}:${minutes}:${seconds} ${timezoneString} (India Standard Time)`;
                return formattedDate;
            },
            
            //  Example usage:
            // const date = new Date('2023-10-23T05:30:00');
            // const formattedDate = formatDateToCustomFormat(date);
            // console.log(formattedDate);
            
            getSelectItem : function(oEvent){
                let oView = this.getView();
                // console.log("hello");
                var oTable = oEvent.getSource();
                var aSelectedItem = oTable.getSelectedItem();
                let val1 = aSelectedItem.getBindingContext().getProperty('Ebeln');
                let val2 = aSelectedItem.getBindingContext().getProperty('Waers');
                let val3 = aSelectedItem.getBindingContext().getProperty('Maktx');
                let val4 = aSelectedItem.getBindingContext().getProperty('Aedat');
                
                console.log(val1, val2, val3, val4);
                oView.byId("idinput").setValue(val1)
                oView.byId("nameinput").setValue(val2)
                oView.byId("deptinput").setValue(val3)
                oView.byId("id_date").setValue(val4)
                
                     
              },
            updateData: function () {

                var table1 = this.getView().byId("_IDGenTable1");

                var selItem = table1.getSelectedItem();

                var idSelected = selItem.getBindingContextPath().slice(17, -2)

                // console.log(idSelected, typeof idSelected);


                var toUpdate = this.getView().byId("deptinput").getValue();

                var payload = {

                    Ebeln: idSelected,

                    Maktx: toUpdate

                };
                console.log(payload);



                var path = "/ZBTP_TEST_DATA('" + idSelected + "')";

                var odataModel = this.getView().getModel();

                // @ts-ignore

                odataModel.update(path, payload, {

                    success: function (data, response) {

                        MessageBox.success("Successfully Updated");
                        odataModel.refresh();


                    },

                    error: function (error) {

                        MessageBox.error("Error while updating the data"+error);

                    }

                });

            },
            // delete function


            deleteData: function () {
                var table1 = this.getView().byId("_IDGenTable1");

                var selItem = table1.getSelectedItem();
                var idSelected = selItem.getBindingContextPath().slice(17, -2)

                // console.log(idSelected, typeof idSelected);

                var path = "/ZBTP_TEST_DATA('" + idSelected + "')"; ///Categories(3);
                var odataModel = this.getView().getModel();
                // console.log(path);

                odataModel.remove(path, {

                    success: function (data, response) {

                        MessageBox.success("Deleted data");

                        odataModel.refresh();
                    },
                    error: function (error) {
                        MessageBox.error("Deletion failed"+error);
                    }
                })
            }

            

        });

    });