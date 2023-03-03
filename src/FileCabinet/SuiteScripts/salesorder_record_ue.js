/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/record'],
    /**
 * @param{record} record
 */
    (record) => {
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
            try {
                var transactionSearchObj = search.create({
                    type: "transaction",
                    filters:
                        [
                            ["salesorder", "anyof", "51096"],
                            "AND",
                            ["type", "anyof", "CustInvc"],
                            "AND",
                            ["type", "anyof", "ItemShip"]
                        ],
                    columns:
                        [
                            search.createColumn({ name: "salesorder", label: "Sales Order" })
                        ]
                });
                var searchResultCount = transactionSearchObj.runPaged().count;
                if (searchResultCount = 0) {
                    if (scriptContext.type === 'view') {
                        scriptContext.form.addButton({
                            id: 'custpage_wipfli_button',
                            label: 'Complete transaction',
                            functionName: 'completeTransaction()'
                        });
                        scriptContext.form.clientScriptModulePath = './salesorder_record_cs.js';
                    }
                }
            }
            catch (e) {
                log.error("error in beforeload", e.message);
                return false;
            }
        }

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

        return { beforeLoad, beforeSubmit, afterSubmit }

    });
