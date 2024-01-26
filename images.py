from tkinter import Tk, filedialog
from PIL import Image

def resize_image(input_path, output_path, size):
    with Image.open(input_path) as img:
        img_resized = img.resize((size, size), resample=Image.BICUBIC)
        img_resized.save(output_path)

def main():
    root = Tk()
    root.withdraw()

    # Solicitar al usuario que seleccione una imagen
    file_path = filedialog.askopenfilename(title="Selecciona una imagen")

    if not file_path:
        print("No se seleccionó ninguna imagen. Saliendo.")
        return

    print(f"Imagen seleccionada: {file_path}")

    # Solicitar al usuario la carpeta de salida
    output_folder = filedialog.askdirectory(title="Selecciona la carpeta de salida")

    if not output_folder:
        print("No se seleccionó ninguna carpeta de salida. Saliendo.")
        return

    print(f"Carpeta de salida: {output_folder}")

    # Tamaños deseados
    sizes = [512, 192, 180, 152, 144, 128, 120, 96, 72, 48, 36]

    # Procesar y guardar imágenes en diferentes tamaños
    for size in sizes:
        output_name = f"{size}.png"
        output_path = f"{output_folder}/{output_name}"
        resize_image(file_path, output_path, size)
        print(f"Imagen {output_name} creada en {output_folder}")

if __name__ == "__main__":
    main()
