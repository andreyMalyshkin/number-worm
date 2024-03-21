declare module '@green-api/whatsapp-api-client' {
    export function sendMessage(): any;
    export function setSettings(): any;
    export function sendFileByUrl(): any;

    declare module '@green-api/whatsapp-api-client' {
        interface RestApiOptions {
            idInstance: string;
            apiTokenInstance: string;
        }

        export function restApi(options: RestApiOptions): any;
    }
}