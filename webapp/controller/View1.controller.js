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

                var data = {

                    Ebeln: ID,

                    Waers: Name,

                    Maktx: materialName

                };

                var odataModel = this.getView().getModel();

                // console.log(data, odataModel);

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

            updateData: function () {

                var table1 = this.getView().byId("_IDGenTable1");

                var selItem = table1.getSelectedItem();

                var idSelected = selItem.getBindingContextPath().slice(17, -2)

                // console.log(idSelected, typeof idSelected);

                // var title = selItem.getTitle();

                // var description = selItem.getDescription();

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