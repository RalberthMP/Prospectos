export class CompraClass
{
     CodigoCompra: number;
     CodigoMoneda :string ;
     FechaCompra :Date;
     Agrupado: boolean;
     FechaHoraCancelacion: Date;
     CodigoUsuario: number;
     CodigoUsuarioCancelacion: number;
     CodigoBodega: number;
     NombreBodega:string ;
     NombreMoneda:string ;
     //CodigoUsuarioCreacion: number;
     TotalCompra: number;
     DetalleCompra:CompraDetalleClass[];
     DetalleGasto: CompraGastoClass[];
}

export class CompraDetalleClass
{
     NombreAgricultor:string;
     CodigoAgricultor:number;
     NombreProveedor:string;
     CodigoProveedor:number;
     CodigoCultivo:number;
     Cultivo:string;
     CodigoProducto:string;
     Producto:string;
     CantidadPallets:number;
     NumeroPallet:string;
     CantidadCajas:number;
     Precio:number;
}

export class CompraGastoClass
{
     CodigoTipoGasto:number;
     ImporteGasto:number;
     CodigoMoneda:string;
     TipoGasto:number;
}

export class Expordata{
     CodigoProducto : string; 
     CodigoCultivo  : string; 
     NombreProducto : string;
     PrecioMax : number;
     PrecioMin : number;
     constructor(){
       this.CodigoProducto  = "";
       this.CodigoCultivo   = "";
       this.NombreProducto  = "";
       this.PrecioMax = 0;
       this.PrecioMin = 0;
     }
   }

   export class ListaCultivoAgricul{
     CodigoAgricultor    : string; 
     CodigoCultivo    : string;
     constructor(){
       this.CodigoAgricultor   = "";
       this.CodigoCultivo   = "";
      
      }
   }

   export class DatosProveedor
   {
     NombreProveedor:string;
     NombreArchivo:string;
     Tipoarchivo : string;
     Data :string;
    Cultivos:Cultivos[];
   }

   export class Cultivos{
     CodigoCultivo:number
   }

   export class Archivo{
     CodigoAgricultor    : string; 
     NombreArchivo    : string;
     URL : string;
     Data :string


     constructor(){
       this.CodigoAgricultor   = "";
       this.NombreArchivo   = "";
       this.URL="";
       this.Data="";
      
      }
   }
   export class Prospecto{
    

    Nombre:string;
    PrimerApellido:string;
    SegundoApellido:string;
    Calle:string;
    Numero:string;
    Colonia:string;
    CodigoPostal:number;
    Telefono:string;
    RFC:string;
    Status:string;
    Comentarios:string;
  }

export class ArchivosClass{
    NombreFoto : string;
    NombreFotoCompleto  : string;
    Data  : string;
    Url  : string;
    TipoArchivo : string;
     IdProspecto : number;
}