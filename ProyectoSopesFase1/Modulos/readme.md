

INSTALACION
https://www.ediciones-eni.com/open/mediabook.aspx?idR=c0fbae24e16963e940d4a66109ee88ce
sudo apt-get install gcc build-essential linux-headers-$(uname -r) 
sudo apt-get install make

--crear un archivo ram_grupo9.c
--crear un archivo Makefile

--en el directorio donde estoy compilo los archivos anteriores
make

--cargarlo
sudo insmod ram_grupo9.ko
--visualizar los mensajes del kernel
dmesg
--remover el modulo con el nombre
sudo rmmod ram_grupo9



--mostrar todos los modulos
lsmod

--- investigar lo siguiente
  struct sysinfo info;
    long cached;
	si_meminfo(&info);

#include <linux/sysinfo.h>
#include <linux/init.h>
#include <linux/proc_fs.h>
#include <linux/seq_file.h>
#include <linux/swap.h>