from lib2to3.pgen2 import driver
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By

PATH = "C:\Program Files (x86)\chromedriver.exe"
driver = webdriver.Chrome(PATH)

driver.get('http://localhost:3002')

WebDriverWait(driver, 1).until(EC.element_to_be_clickable((By.ID, "protected"))).click()

WebDriverWait(driver, 1).until(EC.element_to_be_clickable((By.ID, "redirect-back"))).click()

WebDriverWait(driver, 1).until(EC.element_to_be_clickable((By.ID, "protected"))).click()
