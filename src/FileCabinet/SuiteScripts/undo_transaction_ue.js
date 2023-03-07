/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/record', 'N/search'],
    /**
 * @param{record} record
 * @param{search} search
 */
    (record, search) => {
        /**
         * Defines the function definition that is executed before record is loaded.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @param {Form} scriptContext.form - Current form
         * @param {ServletRequest} scriptContext.request - HTTP request information sent from the browser for a client action only.
         * @since 2015.2
         */
  

      const beforeLoad = (scriptContext) => {

         if (scriptContext.type == "view") {
         var salesOrderId = scriptContext.newRecord.id;
        
         var itemfulfillmentSearch = search.create({
            type: "itemfulfillment",
            filters:
            [
               ["createdfrom","anyof",salesOrderId], 
               "AND", 
               ["type","anyof","ItemShip"], 
               "AND", 
               ["mainline","is","T"]
            ],
            columns:
            [
               search.createColumn({name: "internalid", label: "Internal ID"})
            ]
         });
         var itemFulfillments = itemfulfillmentSearch.run().getRange(0, 10);


         var invoiceSearch = search.create({
            type: "invoice",
            filters:
            [
               ["createdfrom","anyof",salesOrderId], 
               "AND", 
               ["type","anyof","CustInvc"], 
               "AND", 
               ["mainline","is","T"]
            ],
            columns:
            [
               search.createColumn({name: "internalid", label: "Internal ID"})
            ]
         });
         var invoices = invoiceSearch.run().getRange(0, 10);

         
         if (itemFulfillments.length > 0 || invoices.length > 0) {
             scriptContext.form.addButton({
               id: "custpage_undo_button",
               label: "Undo",
               functionName: 'deletetransaction(' + salesOrderId + ')',
             });
             scriptContext.form.clientScriptModulePath = "./undo_transaction_cs.js";
         }
      }
       };
      


     
        /**
         * Defines the function definition that is executed before record is submitted.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {Record} scriptContext.oldRecord - Old record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @since 2015.2
         */
        const beforeSubmit = (scriptContext) => {

        }

        /**
         * Defines the function definition that is executed after record is submitted.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {Record} scriptContext.oldRecord - Old record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @since 2015.2
         */
        const afterSubmit = (scriptContext) => {

        }

        return {beforeLoad, beforeSubmit, afterSubmit}

    });
