#include <linux/module.h>
#include <linux/sysinfo.h>
#include <linux/init.h>
#include <linux/proc_fs.h>
#include <linux/seq_file.h>
#include <linux/swap.h>
#include <linux/mm.h>
#include <linux/vmstat.h>
#include <linux/time.h>
#include  <linux/capability.h>
#include  <linux/threads.h>
#include  <linux/kernel.h>
#include  <linux/types.h>
#include  <linux/timex.h>
#include  <linux/jiffies.h>


static int mostrar_init(struct seq_file *m, void *v)
{
    struct sysinfo datosram;
	si_meminfo(&datosram);

    seq_printf(m,"{\n ");
    seq_printf(m, "\t\"nombreVM\" : \"vm1\" ,\n");
    seq_printf(m,"\t\"endpoint\":\"/getDataRAM\",\n");
    seq_printf(m,"\t\"data\":[{\n");
    seq_printf(m,"\t\"total\":%ld,\n", datosram.totalram*datosram.mem_unit/1024);
    seq_printf(m,"\t\"memoriaEnUso\":%ld,\n", ((datosram.totalram-datosram.freeram)*datosram.mem_unit)/1024);
    seq_printf(m,"\t\"porcentaje\":%ld,\n", (((datosram.totalram-datosram.freeram)/datosram.totalram)*datosram.mem_unit)/1024);
    seq_printf(m,"\t\"memoriaLibre\":%ld\n", datosram.freeram*datosram.mem_unit/1024);
    seq_printf(m,"\t }] \n");
    seq_printf(m,"}");
    return 0;
}

static ssize_t escribir_init(struct file *file, const char __user *buffer, size_t count, loff_t *f_pos)
{
    return 0;
}

static int abrir_init(struct inode *inode, struct file *file)
{
    return single_open(file, mostrar_init, NULL);
}

static struct proc_ops datos_op={
    .proc_open = abrir_init,
    .proc_release = single_release,
    .proc_read = seq_read,
    .proc_lseek = seq_lseek,
    .proc_write = escribir_init
};

static int __init ram9_init(void)
{
    struct proc_dir_entry *entry;
    entry = proc_create("ram_grupo9.json", 0777, NULL, &datos_op);
    if (!entry)
    {
        return -1;
    }
    if (entry)
    {
        printk(KERN_INFO "Módulo RAM del Grupo9 Cargado\n");
    }
    return 0;
}

static void __exit ram9_exit(void)
{
    remove_proc_entry("ram_grupo9.json", NULL);
    printk(KERN_INFO "Módulo RAM del Grupo9 Desmontado\n");
}

module_init(ram9_init);
module_exit(ram9_exit);

MODULE_LICENSE("GPL");
MODULE_AUTHOR("Sergio Ariel Ramirez Castro - grupo9");
