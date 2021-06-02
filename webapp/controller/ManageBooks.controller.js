sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/resource/ResourceModel"
 ], function (Controller, MessageToast, ResourceModel) {
    "use strict";
    return Controller.extend("org.ubb.books.controller.AddBookPage", {
       
        onInit : function () {
            // set i18n model on view
            var i18nModel = new ResourceModel({
               bundleName: "org.ubb.books.i18n.i18n"
            });
            this.getView().setModel(i18nModel, "i18n");
         },

        onAddBook(oEvent) {
           var oBook =  {
                Isbn: "",
                Title: "",
                Author: "",
                Published: "",
                Language: "",
                TotalNoBooks: 0,
                NoAvailableBooks: 0
            };
            
            debugger;
            oBook.Isbn = this.getView().byId("isbn").getValue();
            oBook.Title = this.getView().byId("title").getValue();
            oBook.Author = this.getView().byId("author").getValue();
            oBook.Published = this.getView().byId("publishedDate").getValue();
            oBook.Language = this.byId("language").getValue();
            oBook.TotalNoBooks = parseInt(this.byId("totalBooks").getValue());
            oBook.NoAvailableBooks = parseInt(this.byId("availableBooks").getValue());

            var oBundle = this.getView().getModel("i18n").getResourceBundle();
            var sRecipient = this.getView().getModel().getProperty("/recipient/name");
            var successMsg = oBundle.getText("addSuccess", [sRecipient]);
            var errorBackMsg = oBundle.getText("backError", [sRecipient]);
            var errorFrontMsg = oBundle.getText("addFrontError", [sRecipient]);

            if(oBook.TotalNoBooks >= oBook.NoAvailableBooks) {
                this.getView().getModel().create("/Books", oBook, {
                    success: function () {
                        MessageToast.show(successMsg);
                    },
                    error: function () {
                        MessageToast.show(errorBackMsg);
                    }
                });
            } else {
                MessageToast.show(errorFrontMsg);
            }
       },

       onUpdateBook(oEvent) {

            var oBook =  {
               Isbn: "",
               Title: "",
               Author: "",
               Published: "",
               Language: "",
               TotalNoBooks: 0,
               NoAvailableBooks: 0
            };

            oBook.Isbn = this.getView().byId("isbn").getValue();
            oBook.Title = this.getView().byId("title").getValue();
            oBook.Author = this.getView().byId("author").getValue();

            var oDate = this.getView().byId("publishedDate").getValue();
            var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-ddTHH:mm:ss" });
            var date = new Date(oDate);
            var dateFormatted = dateFormat.format(date);

            oBook.Published = dateFormatted;
            oBook.Language = this.byId("language").getValue();
            oBook.TotalNoBooks = parseInt(this.byId("totalBooks").getValue());
            oBook.NoAvailableBooks = parseInt(this.byId("availableBooks").getValue());

            var oBundle = this.getView().getModel("i18n").getResourceBundle();
            var sRecipient = this.getView().getModel().getProperty("/recipient/name");
            var successMsg = oBundle.getText("updateSuccess", [sRecipient]);
            var errorBackMsg = oBundle.getText("backError", [sRecipient]);
            var errorFrontMsg = oBundle.getText("updateFrontError", [sRecipient]);

            if(oBook.TotalNoBooks >= oBook.NoAvailableBooks) {
                 const sPath = "/Books('" + oBook.Isbn + "')"
                 this.getView().getModel().update(sPath, oBook, {
                     success: function () {
                          MessageToast.show(successMsg);
                     },
                     error: function () {
                          MessageToast.show(errorBackMsg);
                     }
                   });
                 } else {
                     MessageToast.show(errorFrontMsg);
                 }
       },

        onDeleteBook(oEvent) {
            var isbn = this.getView().byId("isbn").getValue();
            const sPath = "/Books('" + isbn + "')"

            var oBundle = this.getView().getModel("i18n").getResourceBundle();
            var sRecipient = this.getView().getModel().getProperty("/recipient/name");
            var successMsg = oBundle.getText("Book deleted successfully!", [sRecipient]);
            var errorBackMsg = oBundle.getText("Something went wrong", [sRecipient]);

            this.getView().getModel().remove(sPath, {
                 success: function () {
                      MessageToast.show(successMsg);
                 },
                 error: function () {
                      MessageToast.show(errorBackMsg);
                 }
             });
        }
 });
 });