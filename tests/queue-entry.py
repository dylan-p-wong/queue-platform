import time
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from concurrent import futures

def queue_flow_test():
    PATH = "C:\Program Files (x86)\chromedriver.exe"
    driver = webdriver.Chrome(PATH)

    driver.get('http://localhost:3002')

    WebDriverWait(driver, 100).until(EC.element_to_be_clickable((By.ID, "protected"))).click()

    WebDriverWait(driver, 100).until(EC.element_to_be_clickable((By.ID, "redirect-back"))).click()

    WebDriverWait(driver, 100).until(EC.element_to_be_clickable((By.ID, "protected"))).click()

    time.sleep(1)

    protected_data = driver.find_element_by_id('protected-data')

    if protected_data:
      print("QUEUE SUCCESS")
    else:
      print("QUEUE FAIL")

    driver.quit()  

with futures.ThreadPoolExecutor() as executor:
  for i in range(5):
    executor.submit(queue_flow_test)
    time.sleep(0.5)
