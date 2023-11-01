sap.ui.define([

    "sap/ui/core/mvc/Controller",

    "sap/m/MessageBox"

],

    /**

     * @param {typeof sap.ui.core.mvc.Controller} Controller

     */

    function (Controller, MessageBox) {

        "use strict";

        var reset1,resetValue;

        return Controller.extend("training1.controller.View1", {

            onInit: function () {



            }

            , onNext: function (oEvent) {

                var oItem = oEvent.getSource();

                var oRouter = this.getOwnerComponent().getRouter();

                oRouter.navTo("RouteView2")

            },
            formatDate: function (date) {
                if (date instanceof Date) {
                    const options = { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' };
                    return date.toLocaleDateString(undefined, options);
                } else {
                    return date; // Handle non-Date values gracefully if needed
                }
            },

            reset1 : function (){
                let oview = this.getView();
                oview.byId("idinput").setValue("")
                oview.byId("nameinput").setValue("")
                oview.byId("deptinput").setValue("")
                oview.byId("idProject").setValue("")
                oview.byId("id_date").setValue("")
            },
            createData: function () {

                var ID = this.getView().byId("idinput").getValue();

                var deptname = this.getView().byId("deptinput").getValue();

                var empName = this.getView().byId("nameinput").getValue();

                var project = this.getView().byId("idProject").getValue();

                var   inputDateString = this.getView().byId("id_date").getValue();
                // Convert to a JavaScript Date object
                const date = new Date(inputDateString);
               
       
                var data = {
                    
                    Ebeln: ID,
                    
                    Waers: deptname,
                    
                    Maktx: empName,
                    Belnr : project,
                    Aedat: date
                    
                };
                // console.log(data);
            

                var odataModel = this.getView().getModel();


                odataModel.create("/ZBTP_TEST_DATA", data, {

                    success:  (data, response) =>{

                        
                        MessageBox.success("Data successfully created");
                        
                        odataModel.refresh();
                        
                        this.reset1();

                    },

                    error: function (error) {

                        MessageBox.error("Error while creating the data");

                       
                    }

                });

            },
            
            getSelectItem : function(oEvent){

                let oView = this.getView();
                // console.log("hello");
                var oTable = oEvent.getSource();

                var aSelectedItem = oTable.getSelectedItem();

                let val1 = aSelectedItem.getBindingContext().getProperty('Ebeln');
                let val2 = aSelectedItem.getBindingContext().getProperty('Waers');
                let val3 = aSelectedItem.getBindingContext().getProperty('Maktx');
                let val4 = aSelectedItem.getBindingContext().getProperty('Belnr');
                let val5 = aSelectedItem.getBindingContext().getProperty('Aedat');
                
                // console.log(val1, val2, val3, val4,val5);
                
                oView.byId("idinput").setValue(val1)
                oView.byId("deptinput").setValue(val2)
                oView.byId("nameinput").setValue(val3)
                oView.byId("idProject").setValue(val4);
                oView.byId("id_date").setValue(val5)
                
                     
              },
            updateData: function () {
                
                 let oview = this.getView();
                var table1 = this.getView().byId("_IDGenTable1");

                var selItem = table1.getSelectedItem();

                let idSelected = selItem.getBindingContextPath().slice(17, -2)

                // console.log(idSelected, typeof idSelected);

                let updatedDept = this.getView().byId("deptinput").getValue();
                let updatedName = this.getView().byId("nameinput").getValue();
                let updatedProject = this.getView().byId("idProject").getValue();
                let updatedDate = new Date (this.getView().byId("id_date").getValue());

                let payload = {

                    Maktx: updatedName,

                    Waers: updatedDept,

                    Belnr: updatedProject,
                    Aedat: updatedDate

                };
                // console.log(payload);

                var path = "/ZBTP_TEST_DATA('" + idSelected + "')";

                var odataModel = this.getView().getModel();

                // @ts-ignore

                odataModel.update(path, payload, {

                    success: (data, response) =>{
                        
                        MessageBox.success("Successfully Updated");

                        odataModel.refresh();
                           this.reset1()
                 

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

                    success: (data, response) =>{

                        MessageBox.success("Deleted data");

                        odataModel.refresh();

                        this.reset1()
                        
                       
                    },
                    error: function (error) {
                        MessageBox.error("Deletion failed"+error);
                    }
                })
            },

            

        });

    });