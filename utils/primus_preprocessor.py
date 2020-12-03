import os
import shutil
import click
from glob import glob
from typing import Tuple, Dict, List, Callable, Any
from pathlib import Path

class PrimusPreprocessor:
    def __init__(self, data_path: str) -> None:
        self.data_path: str = data_path
    
    def extract_data(self) -> None:
        aa_ab = os.listdir(self.data_path)
        for ax in aa_ab:
            ax_path = os.path.join(self.data_path, ax)
            ax_save_path = f'{ax_path}_extracted'
            Path(ax_save_path).mkdir(parents=True, exist_ok=True)
            
            ax_png = glob(f'{ax_path}/*/*.png')
            ax_mei = [png.replace('.png', '.mei') for png in ax_png]
            
            for png, mei in zip(ax_png, ax_mei):
                shutil.move(png, ax_save_path)
                shutil.move(mei, ax_save_path)
                
            shutil.rmtree(ax_path)
            os.rename(ax_save_path, ax_path)


DATASET_PATH = '/home/mateusz/Desktop/7SEM/THESIS/primus'
@click.command()
@click.option('--dataset-path', default = DATASET_PATH, help='Path to original dataset directory.')
def main(dataset_path: str):
    primus = PrimusPreprocessor(dataset_path)
    primus.extract_data()

if __name__ == "__main__":
    main()